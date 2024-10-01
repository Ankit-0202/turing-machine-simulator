# Turing Machine Simulator

**Turing Machine Simulator** is a web-based application that allows users to design, configure and simulate Turing machines using Morphett notation.

---

## Table of Contents

- [Turing Machine Simulator](#turing-machine-simulator)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
    - [Adding Transitions](#adding-transitions)
      - [Individual Input](#individual-input)
      - [Bulk Input](#bulk-input)
    - [Configuring the Input String](#configuring-the-input-string)
    - [Running the Simulation](#running-the-simulation)
    - [Viewing Tape and Status](#viewing-tape-and-status)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**: [Download and install Node.js](https://nodejs.org/) (includes npm).
- **Python+**: [Download and install Python](https://www.python.org/downloads/).
- **Git**: [Download and install Git](https://git-scm.com/downloads).
- **Basic Knowledge**: Familiarity with React, TypeScript, Flask and Tailwind CSS is beneficial.

---

## Installation

### Backend Setup

1. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2. **Create a Virtual Environment**

    ```bash
    python3 -m venv venv
    ```

3. **Activate the Virtual Environment**

    - **On macOS/Linux:**

        ```bash
        source venv/bin/activate
        ```

    - **On Windows:**

        ```bash
        venv\Scripts\activate
        ```

4. **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

5. **Run the Flask Server**

    ```bash
    python app.py
    ```

    The backend server will start at [http://127.0.0.1:5001](http://127.0.0.1:5001).

### Frontend Setup

1. **Navigate to the Frontend Directory**

    Open a new terminal window/tab and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the React Development Server**

    ```bash
    npm start
    ```

    The frontend application will launch in your default browser at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Adding Transitions

Transitions define how the Turing machine operates. You can add transitions individually or in bulk.

#### Individual Input

1. **Navigate to the Transitions Section**

    In the simulator interface, locate the **Transitions** section.

2. **Fill in the Transition Fields**

    - **Current State**: The state the machine is currently in.
    - **Read Symbol**: The symbol the machine reads on the tape.
    - **Write Symbol**: The symbol the machine writes on the tape.
    - **Direction**: The direction to move the tape head (`l` for left, `r` for right, `*` to stay).
    - **New State**: The state the machine transitions to.

3. **Add the Transition**

    Click the **Add** button to include the transition in the list.

#### Bulk Input

1. **Navigate to the Bulk Add Transitions Section**

    Scroll down to find the **Bulk Add Transitions** section.

2. **Enter Multiple Transitions**

    Input multiple transitions in the text area, one per line, following the format:

    ```
    <current_state> <read_symbol> <write_symbol> <direction> <new_state>
    ```

    **Example:**

    ```
    # Transition format: current_state read_symbol write_symbol direction new_state
    start 1 0 l carry
    start 0 1 * halt-accept
    carry 1 1 l carry
    carry 0 1 * halt-accept
    ```

    - Lines starting with `#` are treated as comments and ignored.
    - Ensure each transition has exactly five fields separated by spaces.

3. **Add Bulk Transitions**

    Click the **Add Bulk Transitions** button to parse and add all valid transitions.

    - **Errors**: If any transitions are malformed or duplicate, error messages will be displayed below the button.

### Configuring the Input String

1. **Navigate to the Input String Section**

    Locate the **Input String** section in the simulator interface.

2. **Enter the Initial Tape String**

    Input the initial string to be placed on the tape.

    **Example:** `1011`

    - Use `_` to represent blank symbols if needed.

### Running the Simulation

1. **Start Simulation**

    - Click the **Start Simulation** button to initialise the Turing machine with the defined transitions and input string.
    - The machine performs the first transition automatically.

2. **Step Through Transitions**

    - Use the **Step** button to execute transitions one by one.
    - After each step, observe the tape and status updates.

3. **Run Continuously**

    - Click the **Run** button to execute all transitions continuously until the machine halts.
    - The simulation runs in real-time, updating the tape and status accordingly.

4. **Reset Simulation**

    - Click the **Reset** button to reset the machine to its initial state with the provided input string.
    - All transitions and simulation states are cleared.

### Viewing Tape and Status

- **Tape Display**

  - Visual representation of the tape with the current head position highlighted.
  - Symbols are displayed within boxes, and the head is indicated by a red triangle above the active cell.

- **Status Display**

  - Shows the current state of the Turing machine.
  - Displays the number of steps executed during the simulation.

---
