from typing import Dict, Optional, List, Tuple
from dataclasses import dataclass

@dataclass
class Transition:
    new_state: str
    write_symbol: Optional[str]  # None indicates no change
    direction: str  # 'l', 'r', '*'
    breakpoint: bool = False  # Indicates if this transition has a breakpoint

class TuringMachine:
    def __init__(self, transitions: List[Dict], input_string: str, start_state: str = 'start', tape_symbol: str = '_'):
        """
        Initialize the Turing Machine.

        :param transitions: List of transitions as dictionaries with keys:
                            'current_state', 'read_symbol', 'write_symbol', 'direction', 'new_state', 'breakpoint' (optional)
        :param input_string: The initial tape input string. Use '*' to indicate the starting head position.
        :param start_state: The starting state of the Turing Machine.
        :param tape_symbol: The symbol representing a blank on the tape.
        """
        self.tape_symbol = tape_symbol
        self.transitions = self.parse_transitions(transitions)
        self.tape, self.head = self.parse_input(input_string)
        self.current_state = start_state
        self.steps = 0
        self.halted = False
        self.history = []  # List of transitions taken

    def parse_transitions(self, transitions: List[Dict]) -> List[Tuple[str, str, Transition]]:
        """
        Parse the list of transition dictionaries into a list of Transition objects.
        Enforces determinism by ensuring no duplicate (current_state, read_symbol) pairs.

        :param transitions: List of transitions as dictionaries.
        :return: List of tuples (current_state, read_symbol, Transition)
        """
        parsed_transitions = []
        seen_keys = set()
        for idx, t in enumerate(transitions):
            # Extract fields
            current_state = t.get('current_state')
            read_symbol = t.get('read_symbol')
            write_symbol = t.get('write_symbol')
            direction = t.get('direction')
            new_state = t.get('new_state')
            breakpoint_flag = t.get('breakpoint', False)

            # Validation
            if not all([current_state, read_symbol, write_symbol, direction, new_state]):
                raise ValueError(f"Transition at index {idx} is missing required fields.")

            # Validate symbols: cannot contain ';' or whitespace
            invalid_symbols = {';'}
            if read_symbol != '*' and any(char in invalid_symbols for char in read_symbol):
                raise ValueError(f"Invalid read_symbol '{read_symbol}' in transition at index {idx}.")

            if write_symbol != '*' and any(char in invalid_symbols for char in write_symbol):
                raise ValueError(f"Invalid write_symbol '{write_symbol}' in transition at index {idx}.")

            # Validate state names: cannot contain ';' or whitespace
            if any(char in {' ', ';'} for char in current_state):
                raise ValueError(f"Invalid current_state '{current_state}' in transition at index {idx}.")

            if any(char in {' ', ';'} for char in new_state):
                raise ValueError(f"Invalid new_state '{new_state}' in transition at index {idx}.")

            # Validate direction
            if direction not in {'l', 'r', '*'}:
                raise ValueError(f"Invalid direction '{direction}' in transition at index {idx}.")

            # Enforce determinism: unique (current_state, read_symbol) pairs unless wildcards are used
            key = (current_state, read_symbol)
            if key in seen_keys and read_symbol != '*':
                raise ValueError(f"Duplicate transition for state-symbol pair: ({current_state}, {read_symbol}) at index {idx}.")
            seen_keys.add(key)

            # Handle '*' in write_symbol and new_state as 'no change'
            actual_write_symbol = write_symbol if write_symbol != '*' else None
            actual_new_state = new_state if new_state != '*' else current_state  # Assuming 'no change' means stay in current state

            transition = Transition(
                new_state=actual_new_state,
                write_symbol=actual_write_symbol,
                direction=direction,
                breakpoint=breakpoint_flag
            )
            parsed_transitions.append((current_state, read_symbol, transition))

        return parsed_transitions  # List of tuples (current_state, read_symbol, Transition)

    def parse_input(self, input_string: str) -> (List[str], int):
        """
        Parse the input string to set up the tape and head position.
        '*' in the input string indicates the starting head position.

        :param input_string: The input string with optional '*' to indicate head position.
        :return: Tuple of (tape as list of symbols, head position as int)
        """
        tape = []
        head = 0
        found_head = False
        for idx, char in enumerate(input_string):
            if char == '*' and not found_head:
                head = len(tape)
                found_head = True
            else:
                tape.append(char)

        # If '*' was not found, default head to 0
        if not found_head:
            head = 0

        # Replace any remaining '*' in the tape with blank symbol
        tape = [self.tape_symbol if c == '*' else c for c in tape]

        return tape, head

    def step(self) -> Optional[Dict]:
        """
        Execute one step of the Turing Machine.

        :return: Dictionary containing the step details or None if halted.
        """
        if self.halted:
            return None

        # Read the current symbol under the head
        if self.head < len(self.tape):
            current_symbol = self.tape[self.head]
        else:
            current_symbol = self.tape_symbol
            self.tape.append(self.tape_symbol)

        # Find matching transitions, considering wildcards
        possible_transitions = []

        for (state, symbol, transition) in self.transitions:
            state_match = (state == self.current_state) or (state == '*')
            symbol_match = (symbol == current_symbol) or (symbol == '*')
            if state_match and symbol_match:
                possible_transitions.append((state, symbol, transition))

        if not possible_transitions:
            self.halted = True
            return {
                "halted": self.halted,
                "current_state": self.current_state,
                "tape": ''.join(self.tape).replace(self.tape_symbol, '_'),
                "head": self.head,
                "steps": self.steps
            }

        # Priority: exact match > wildcard state > wildcard symbol > both wildcards
        # Sort transitions based on specificity
        def transition_priority(t):
            state, symbol, _ = t
            priority = 0
            if state != '*' and symbol != '*':
                priority = 4
            elif state != '*' and symbol == '*':
                priority = 3
            elif state == '*' and symbol != '*':
                priority = 2
            else:
                priority = 1
            return priority

        possible_transitions.sort(key=transition_priority, reverse=True)

        # Select the most specific transition
        selected_transition = possible_transitions[0][2]

        # Log the transition taken
        transition_taken = {
            "step": self.steps + 1,
            "current_state": self.current_state,
            "read_symbol": current_symbol,
            "write_symbol": selected_transition.write_symbol if selected_transition.write_symbol else current_symbol,
            "direction": selected_transition.direction,
            "new_state": selected_transition.new_state,
            "breakpoint": selected_transition.breakpoint
        }
        self.history.append(transition_taken)

        # Write the new symbol if not None
        if selected_transition.write_symbol:
            self.tape[self.head] = selected_transition.write_symbol

        # Move the head
        if selected_transition.direction == 'r':
            self.head += 1
            if self.head >= len(self.tape):
                self.tape.append(self.tape_symbol)
        elif selected_transition.direction == 'l':
            if self.head > 0:
                self.head -= 1
            else:
                self.tape.insert(0, self.tape_symbol)
                self.head = 0
        elif selected_transition.direction == '*':
            pass  # Do not move
        else:
            raise ValueError(f"Invalid direction: {selected_transition.direction}")

        # Update the current state
        self.current_state = selected_transition.new_state
        self.steps += 1

        # Check for halting state
        if self.current_state.startswith('halt'):
            self.halted = True

        # If breakpoint is set, halt the machine
        if selected_transition.breakpoint:
            self.halted = True

        # Prepare the tape for response
        tape_display = ''.join(self.tape).replace(self.tape_symbol, '_')

        return {
            "halted": self.halted,
            "current_state": self.current_state,
            "tape": tape_display,
            "head": self.head,
            "steps": self.steps,
            "transition_taken": transition_taken
        }

    def run(self) -> Optional[Dict]:
        """
        Run the Turing Machine until it halts.

        :return: Dictionary containing the final state details.
        """
        if self.halted:
            return None

        while not self.halted:
            self.step()

        return {
            "halted": self.halted,
            "current_state": self.current_state,
            "tape": ''.join(self.tape).replace(self.tape_symbol, '_'),
            "head": self.head,
            "steps": self.steps,
            "transitions_traversed": self.history
        }

    def reset(self, input_string: str, start_state: str = 'start'):
        """
        Reset the Turing Machine with a new input string and start state.

        :param input_string: The new input string with optional '*' to indicate head position.
        :param start_state: The new start state.
        """
        self.tape, self.head = self.parse_input(input_string)
        self.current_state = start_state
        self.steps = 0
        self.halted = False
        self.history = []
