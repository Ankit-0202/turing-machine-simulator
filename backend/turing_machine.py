# backend/turing_machine.py

from typing import Dict, Optional, List
from dataclasses import dataclass

@dataclass
class Transition:
    new_state: str
    write_symbol: str
    direction: str  # 'l', 'r', '*'

class TuringMachine:
    def __init__(self, transitions: List[Dict], input_string: str, start_state: str = 'start', tape_symbol: str = '_'):
        """
        Initialize the Turing Machine.

        :param transitions: List of transitions as dictionaries with keys:
                            'current_state', 'read_symbol', 'write_symbol', 'direction', 'new_state'
        :param input_string: The initial tape input string.
        :param start_state: The starting state of the Turing Machine.
        :param tape_symbol: The symbol representing a blank on the tape.
        """
        self.transitions = self.parse_transitions(transitions)
        self.tape = list(input_string) if input_string else [tape_symbol]
        self.head = 0
        self.current_state = start_state  # Set to the provided start state
        self.steps = 0
        self.tape_symbol = tape_symbol
        self.halted = False

    def parse_transitions(self, transitions: List[Dict]) -> Dict[str, Transition]:
        """
        Parse the list of transition dictionaries into a dictionary with keys as "state,symbol".

        :param transitions: List of transitions as dictionaries.
        :return: Dictionary with keys as "state,symbol" and values as Transition objects.
        """
        transition_dict = {}
        for t in transitions:
            direction = t.get('direction')
            if direction not in {'l', 'r', '*'}:
                raise ValueError(f"Invalid direction '{direction}' in transition: {t}")
            key = f"{t['current_state']},{t['read_symbol']}"
            if key in transition_dict:
                raise ValueError(f"Duplicate transition for state-symbol pair: ({t['current_state']}, {t['read_symbol']})")
            transition_dict[key] = Transition(
                new_state=t['new_state'],
                write_symbol=t['write_symbol'],
                direction=t['direction']
            )
        return transition_dict

    def step(self) -> Optional[Dict]:
        if self.halted:
            return None

        # Read the current symbol under the head
        if self.head < len(self.tape):
            current_symbol = self.tape[self.head]
        else:
            current_symbol = self.tape_symbol

        key = f"{self.current_state},{current_symbol}"
        transition = self.transitions.get(key)

        if not transition:
            self.halted = True
            return {
                "halted": self.halted,
                "current_state": self.current_state,
                "tape": ''.join(self.tape).replace(self.tape_symbol, '_'),
                "head": self.head,
                "steps": self.steps
            }

        # Write the new symbol
        if self.head < len(self.tape):
            self.tape[self.head] = transition.write_symbol
        else:
            self.tape.append(transition.write_symbol)

        # Move the head
        if transition.direction == 'r':
            self.head += 1
            if self.head >= len(self.tape):
                self.tape.append(self.tape_symbol)
        elif transition.direction == 'l':
            if self.head > 0:
                self.head -= 1
            else:
                self.tape.insert(0, self.tape_symbol)
                self.head = 0
        elif transition.direction == '*':
            pass  # Do not move
        else:
            raise ValueError(f"Invalid direction: {transition.direction}")

        # Update the current state
        self.current_state = transition.new_state
        self.steps += 1

        # Check for halting state
        if self.current_state.startswith('halt'):
            self.halted = True

        # Prepare the tape for response
        tape_display = ''.join(self.tape).replace(self.tape_symbol, '_')
        return {
            "halted": self.halted,
            "current_state": self.current_state,
            "tape": tape_display,
            "head": self.head,
            "steps": self.steps
        }

    def reset(self, input_string: str, start_state: str = 'start'):
        self.tape = list(input_string) if input_string else [self.tape_symbol]
        self.head = 0
        self.current_state = start_state
        self.steps = 0
        self.halted = False
