# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from turing_machine import TuringMachine
import os

app = Flask(__name__)
CORS(app)

tm = None

@app.route('/initialize', methods=['POST'])
def initialize():
    global tm
    data = request.get_json()
    transitions = data.get('transitions', [])
    input_string = data.get('input_string', '_')
    start_state = data.get('start_state', 'start')  # Default to 'start' if not provided

    try:
        # Initialize the Turing Machine
        tm = TuringMachine(transitions, input_string, start_state)
    except ValueError as ve:
        return jsonify({"detail": str(ve)}), 400
    except Exception as e:
        return jsonify({"detail": "Failed to initialize Turing Machine."}), 500

    return jsonify({"message": "Turing Machine initialized successfully."}), 200

@app.route('/step', methods=['POST'])
def step():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    try:
        result = tm.step()
        if result is None:
            return jsonify({"detail": "Turing Machine has already halted."}), 400
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"detail": "Error during stepping the Turing Machine."}), 500

@app.route('/run', methods=['POST'])
def run():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    try:
        while not tm.halted:
            tm.step()
        result = {
            "halted": tm.halted,
            "current_state": tm.current_state,
            "tape": ''.join(tm.tape).replace(tm.tape_symbol, '_'),
            "head": tm.head,
            "steps": tm.steps
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"detail": "Error during running the Turing Machine."}), 500

@app.route('/reset', methods=['POST'])
def reset():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine not initialized."}), 400

    data = request.get_json()
    input_string = data.get('input_string', '_')
    start_state = data.get('start_state', 'start')  # Reset to the provided start state

    try:
        tm.reset(input_string, start_state)
    except Exception as e:
        return jsonify({"detail": "Error during resetting the Turing Machine."}), 500

    return jsonify({"message": "Turing Machine reset successfully."}), 200

if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
