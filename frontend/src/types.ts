// frontend/src/types.ts

export interface TransitionInput {
    current_state: string;
    read_symbol: string;
    write_symbol: string;
    direction: 'l' | 'r' | '*';
    new_state: string;
    breakpoint?: boolean; // Optional flag for breakpoints
}

export interface StepOutput {
    halted: boolean;
    current_state: string;
    tape: string;
    head: number;
    steps: number;
    transition_taken?: TransitionTaken; // Present in step response
    transitions_traversed?: TransitionTaken[]; // Present in run response
}

export interface TransitionTaken {
    step: number;
    current_state: string;
    read_symbol: string;
    write_symbol: string;
    direction: string;
    new_state: string;
    breakpoint: boolean;
}
