# Turing Machine Simulator

![Turing Machine Simulator](https://via.placeholder.com/800x200?text=Turing+Machine+Simulator)

**Turing Machine Simulator** is a web-based application that allows users to design, configure, and simulate Turing machines. Leveraging a Flask backend and a React TypeScript frontend styled with Tailwind CSS, this simulator provides an intuitive interface for both educational purposes and computational explorations.

---

## Table of Contents

- [Turing Machine Simulator](#turing-machine-simulator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
  - [Technologies Used](#technologies-used)
    - [**Frontend**](#frontend)
    - [**Backend**](#backend)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
    - [Adding Transitions](#adding-transitions)
      - [Individual Input](#individual-input)
      - [Bulk Input](#bulk-input)
    - [Configuring the Input String](#configuring-the-input-string)
    - [Running the Simulation](#running-the-simulation)
    - [Viewing Tape and Status](#viewing-tape-and-status)
  - [API Endpoints](#api-endpoints)
    - [**1. Initialise the Turing Machine**](#1-initialise-the-turing-machine)
    - [**2. Execute a Single Step**](#2-execute-a-single-step)
    - [**3. Run Simulation Until Halt**](#3-run-simulation-until-halt)
    - [**4. Reset the Turing Machine**](#4-reset-the-turing-machine)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)

---

## Features

- **Transition Configuration**: Add Turing machine transitions individually or in bulk via a text area.
- **Input String Setup**: Define the initial string on the tape.
- **Simulation Controls**: Start, step through, run continuously, and reset the simulation.
- **Tape Visualisation**: Visually represents the tape with the head position highlighted.
- **Status Display**: Shows the current state and the number of steps executed.
- **Responsive Design**: Optimised for various screen sises using Tailwind CSS.
- **Error Handling**: Provides feedback for invalid transitions or simulation errors.

---

## Demo

![Simulator Interface](https://via.placeholder.com/800x400?text=Simulator+Interface)

*Note: Replace the placeholder image URLs with actual screenshots of your application.*

---

## Technologies Used

### **Frontend**

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making API requests.

### **Backend**

- **Flask**: A lightweight WSGI web application framework for Python.
- **Flask-CORS**: A Flask extension for handling Cross-Origin Resource Sharing (CORS).
- **Python 3.7+**

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**: [Download and install Node.js](https://nodejs.org/) (includes npm).
- **Python 3.7+**: [Download and install Python](https://www.python.org/downloads/).
- **Git**: [Download and install Git](https://git-scm.com/downloads).
- **Basic Knowledge**: Familiarity with React, TypeScript, Flask, and Tailwind CSS is beneficial.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/turing-machine-simulator.git
cd turing-machine-simulator
```

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

## API Endpoints

The Flask backend exposes the following API endpoints for the simulator's functionality:

### **1. Initialise the Turing Machine**

- **Endpoint:** `/initialise`
- **Method:** `POST`
- **Description:** Initialises the Turing machine with the provided transitions and input string.
- **Request Body:**

    ```json
    {
        "transitions": [
            {
                "current_state": "start",
                "read_symbol": "1",
                "write_symbol": "0",
                "direction": "l",
                "new_state": "carry"
            },
            // More transitions...
        ],
        "input_string": "1011"
    }
    ```

- **Response:**

    ```json
    {
        "message": "Turing Machine initialised successfully."
    }
    ```

### **2. Execute a Single Step**

- **Endpoint:** `/step`
- **Method:** `POST`
- **Description:** Executes the next transition step in the simulation.
- **Request Body:** Empty
- **Response:**

    ```json
    {
        "current_state": "carry",
        "tape": "1001",
        "head": 2,
        "steps": 1,
        "halted": false
    }
    ```

### **3. Run Simulation Until Halt**

- **Endpoint:** `/run`
- **Method:** `POST`
- **Description:** Executes transitions continuously until the Turing machine halts.
- **Request Body:** Empty
- **Response:**

    ```json
    {
        "current_state": "halt-accept",
        "tape": "1100",
        "head": 4,
        "steps": 4,
        "halted": true
    }
    ```

### **4. Reset the Turing Machine**

- **Endpoint:** `/reset`
- **Method:** `POST`
- **Description:** Resets the Turing machine to its initial state with the provided input string.
- **Request Body:**

    ```json
    {
        "input_string": "1011"
    }
    ```

- **Response:**

    ```json
    {
        "message": "Turing Machine reset successfully."
    }
    ```

---

## Project Structure

```
turing-machine-simulator/
├── backend/
│   ├── app.py
│   ├── turing_machine.py
│   ├── requirements.txt
│   └── venv/ (virtual environment)
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── electron.js (if using Electron)
│   ├── src/
│   │   ├── components/
│   │   │   ├── TransitionInput.tsx
│   │   │   ├── InputString.tsx
│   │   │   ├── Controls.tsx
│   │   │   ├── TapeDisplay.tsx
│   │   │   └── StatusDisplay.tsx
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── types.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## Contributing

Contributions are welcome! Follow these steps to contribute to the project:

1. **Fork the Repository**

    Click the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork**

    ```bash
    git clone https://github.com/yourusername/turing-machine-simulator.git
    cd turing-machine-simulator
    ```

3. **Create a New Branch**

    ```bash
    git checkout -b feature/YourFeatureName
    ```

4. **Make Your Changes**

    Implement your feature or fix.

5. **Commit Your Changes**

    ```bash
    git commit -m "Add feature: YourFeatureName"
    ```

6. **Push to Your Fork**

    ```bash
    git push origin feature/YourFeatureName
    ```

7. **Open a Pull Request**

    Navigate to the original repository and open a pull request from your fork.

---
