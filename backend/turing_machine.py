from typing import Dict, Optional, List
from dataclasses import dataclass

@dataclass
class Transition:
    new_state: str
    write_symbol: str
    direction: str  # 'l', 'r', '*'

class TuringMachine:
    def __init__(self, transitions: Dict[str, Transition], input_string: str, tape_symbol: str = '_'):
        self.transitions = transitions  # Key: "state,symbol"
        self.tape = list(input_string) if input_string else [tape_symbol]
        self.head = 0
        self.current_state = 'start'  # Default start state
        self.steps = 0
        self.tape_symbol = tape_symbol
        self.halted = False

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
            return None

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
            "current_state": self.current_state,
            "tape": tape_display,
            "head": self.head,
            "steps": self.steps,
            "halted": self.halted
        }

    def reset(self, input_string: str):
        self.tape = list(input_string) if input_string else [self.tape_symbol]
        self.head = 0
        self.current_state = 'start'
        self.steps = 0
        self.halted = False
