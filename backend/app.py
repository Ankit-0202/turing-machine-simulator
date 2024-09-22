# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from turing_machine import TuringMachine, Transition
from dataclasses import dataclass
from typing import List, Optional, Dict

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@dataclass
class TransitionInput:
    current_state: str
    read_symbol: str
    write_symbol: str
    direction: str  # 'l', 'r', '*'
    new_state: str

@dataclass
class TuringMachineInput:
    transitions: List[TransitionInput]
    input_string: str

@dataclass
class StepOutput:
    current_state: str
    tape: str
    head: int
    steps: int
    halted: bool

# Initialize a global TuringMachine instance
tm: Optional[TuringMachine] = None

@app.route('/initialize', methods=['POST'])
def initialize_tm():
    global tm
    data = request.get_json()
    transitions_input = data.get('transitions', [])
    input_string = data.get('input_string', '')

    transitions_dict = {}
    for t in transitions_input:
        current_state = t.get('current_state')
        read_symbol = t.get('read_symbol')
        write_symbol = t.get('write_symbol')
        direction = t.get('direction')
        new_state = t.get('new_state')

        key = f"{current_state},{read_symbol}"
        if key in transitions_dict:
            return jsonify({"detail": f"Duplicate transition for state-symbol pair: {key}"}), 400

        if direction not in ['l', 'r', '*']:
            return jsonify({"detail": f"Invalid direction: {direction}"}), 400

        transitions_dict[key] = Transition(
            new_state=new_state,
            write_symbol=write_symbol,
            direction=direction
        )

    tm = TuringMachine(transitions=transitions_dict, input_string=input_string)
    return jsonify({"message": "Turing Machine initialized successfully."}), 200

@app.route('/step', methods=['POST'])
def execute_step():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    step_result = tm.step()
    if not step_result:
        return jsonify({"detail": "Machine has already halted."}), 400

    return jsonify(step_result), 200

@app.route('/run', methods=['POST'])
def run_until_halt():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    step_result = None
    while not tm.halted:
        step_result = tm.step()

    if step_result:
        return jsonify(step_result), 200
    else:
        return jsonify({"detail": "Machine has already halted."}), 400

@app.route('/reset', methods=['POST'])
def reset_tm():
    global tm
    data = request.get_json()
    input_string = data.get('input_string', '_')

    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    tm.reset(input_string)
    return jsonify({"message": "Turing Machine reset successfully."}), 200

if __name__ == '__main__':
    app.run(debug=True)
