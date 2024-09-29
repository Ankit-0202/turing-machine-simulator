import os
import sys
import logging
import webbrowser
import threading
from flask import Flask, request, jsonify, send_from_directory
from turing_machine import TuringMachine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS if frontend is on a different domain/port

# Configure Logging
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s:%(message)s'
)

# Global instance of TuringMachine
tm = None


@app.route("/initialise", methods=["POST"])
def initialise():
    global tm
    data = request.get_json()
    transitions = data.get("transitions", [])
    input_string = data.get("input_string", "_")
    start_state = data.get("start_state", "start")
    machine_type = data.get(
        "machine_type", "standard"
    ).lower()  # Normalise to lowercase

    try:
        tm = TuringMachine(
            transitions=transitions,
            input_string=input_string,
            start_state=start_state,
            machine_type=machine_type,
        )
        return jsonify({"message": "Turing Machine initialised successfully."}), 200
    except ValueError as ve:
        return jsonify({"detail": str(ve)}), 400


@app.route("/step", methods=["POST"])
def step():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine is not initialised."}), 400

    result = tm.step()
    if not result:
        return jsonify({"detail": "Turing Machine has already halted."}), 400

    return jsonify(result), 200


@app.route("/run", methods=["POST"])
def run():
    global tm
    if not tm:
        return jsonify({"detail": "Turing Machine is not initialised."}), 400

    result = tm.run()
    if not result:
        return jsonify({"detail": "Turing Machine has already halted."}), 400

    return jsonify(result), 200


@app.route("/reset", methods=["POST"])
def reset():
    global tm
    data = request.get_json()
    input_string = data.get("input_string", "_")
    start_state = data.get("start_state", "start")
    machine_type = data.get(
        "machine_type", "standard"
    ).lower()  # Normalise to lowercase

    if not tm:
        return jsonify({"detail": "Turing Machine is not initialised."}), 400

    try:
        tm.reset(
            input_string=input_string,
            start_state=start_state,
            machine_type=machine_type,
        )
        return jsonify({"message": "Turing Machine reset successfully."}), 200
    except ValueError as ve:
        return jsonify({"detail": str(ve)}), 400
    
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        logging.info(f"Serving static file: {path}")
        return send_from_directory(app.static_folder, path)
    else:
        logging.info("Serving index.html")
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    if getattr(sys, "frozen", False):
        # If the application is run as a bundle, the PyInstaller bootloader
        # extends the sys module by a flag frozen=True and sets the app path into
        # sys._MEIPASS.
        base_path = sys._MEIPASS
    else:
        base_path = os.path.dirname(os.path.abspath(__file__))

    # Set default port to 5001 to avoid conflicts and disable debug mode
    port = int(os.environ.get("PORT", 5001))
    debug_mode = False  # Disable debug mode for production

    app.run(debug=debug_mode, port=port)
