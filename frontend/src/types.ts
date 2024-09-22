export interface TransitionInput {
    current_state: string;
    read_symbol: string;
    write_symbol: string;
    direction: 'l' | 'r' | '*';
    new_state: string;
}

export interface TuringMachineInput {
    transitions: TransitionInput[];
    input_string: string;
}

export interface StepOutput {
    current_state: string;
    tape: string;
    head: number;
    steps: number;
    halted: boolean;
}
