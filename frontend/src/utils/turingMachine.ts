// frontend/src/utils/turingMachine.ts

export enum Direction {
  LEFT = 'l',
  RIGHT = 'r',
  STAY = '*'
}

export interface Transition {
  current_state: string
  read_symbol: string
  write_symbol: string
  direction: Direction
  new_state: string
  breakpoint?: boolean
}

export interface TransitionTaken {
  step: number
  current_state: string
  read_symbol: string
  write_symbol: string
  direction: Direction
  new_state: string
  breakpoint: boolean
}

export interface TuringMachineConfig {
  transitions: Transition[]
  input_string: string
  start_state: string
  machine_type: MachineType
}

export enum MachineType {
  STANDARD = 'STANDARD',
  LEFT_BOUNDED = 'LEFT_BOUNDED'
}

export interface StepOutput {
  tape: string
  head: number
  current_state: string
  steps: number
  halted: boolean
  transition_taken?: TransitionTaken
  transitions_traversed?: TransitionTaken[]
}

export class TuringMachine {
  private transitions: Transition[]
  private tape: string[]
  private head: number
  private current_state: string
  private steps: number
  private halted: boolean
  private machine_type: MachineType
  private transition_history: TransitionTaken[]

  constructor(config: TuringMachineConfig) {
    this.transitions = config.transitions
    this.tape = config.input_string.split('')
    this.head = this.tape.indexOf('*') !== -1 ? this.tape.indexOf('*') : 0
    if (this.tape[this.head] === '*') {
      this.tape[this.head] = '_' // Replace '*' with '_'
    }
    this.current_state = config.start_state
    this.steps = 0
    this.halted = false
    this.machine_type = config.machine_type
    this.transition_history = []
  }

  public getTape(): string {
    return this.tape.join('')
  }

  public getHead(): number {
    return this.head
  }

  public getCurrentState(): string {
    return this.current_state
  }

  public getSteps(): number {
    return this.steps
  }

  public isHalted(): boolean {
    return this.halted
  }

  public getTransitionHistory(): TransitionTaken[] {
    return this.transition_history
  }

  public step(): StepOutput {
    if (this.halted) {
      return this.generateStepOutput()
    }

    const current_symbol = this.tape[this.head] || '_'

    // First, find specific transition
    let transition = this.transitions.find(
      (t) =>
        t.current_state === this.current_state &&
        t.read_symbol === current_symbol
    )

    // If no specific transition, find wildcard transition for read_symbol
    if (!transition) {
      transition = this.transitions.find(
        (t) => t.current_state === this.current_state && t.read_symbol === '*'
      )
    }

    // Optionally, handle wildcard current_state if needed
    // Uncomment the following if you have transitions with wildcard current_state
    /*
    if (!transition) {
      // Find specific transition with wildcard current_state
      transition = this.transitions.find(
        (t) =>
          t.current_state === '*' &&
          t.read_symbol === current_symbol
      );
    }

    if (!transition) {
      // Find wildcard transition with wildcard current_state
      transition = this.transitions.find(
        (t) =>
          t.current_state === '*' &&
          t.read_symbol === '*'
      );
    }
    */

    if (!transition) {
      // No applicable transition found; halt the machine
      this.halted = true
      return this.generateStepOutput()
    }

    console.log(`Applying Transition: ${JSON.stringify(transition)}`)

    // Apply transition
    const write_symbol =
      transition.write_symbol === '*' ? current_symbol : transition.write_symbol
    this.tape[this.head] = write_symbol

    // Determine new head position
    let new_head = this.head
    if (transition.direction === Direction.LEFT) {
      if (this.machine_type === MachineType.LEFT_BOUNDED && this.head === 0) {
        this.halted = true
        return this.generateStepOutput()
      }
      new_head = this.head > 0 ? this.head - 1 : 0
    } else if (transition.direction === Direction.RIGHT) {
      new_head = this.head + 1
      if (new_head >= this.tape.length) {
        this.tape.push('_') // Extend tape with blank symbol
      }
    }
    // If direction is STAY, head remains the same

    this.head = new_head
    this.current_state = transition.new_state
    this.steps += 1

    // Record transition
    const transition_taken: TransitionTaken = {
      step: this.steps,
      current_state: transition.current_state,
      read_symbol: current_symbol,
      write_symbol: write_symbol,
      direction: transition.direction, // 'l', 'r', '*'
      new_state: transition.new_state,
      breakpoint: transition.breakpoint || false
    }

    console.log(`Transition Taken: ${JSON.stringify(transition_taken)}`)

    this.transition_history.push(transition_taken)

    // Check for breakpoint
    if (transition.breakpoint) {
      this.halted = true
    }

    return this.generateStepOutput(transition_taken)
  }

  public run(): StepOutput[] {
    const outputs: StepOutput[] = []
    while (!this.halted) {
      const output = this.step()
      outputs.push(output)
      if (output.transition_taken?.breakpoint) {
        break
      }
    }
    return outputs
  }

  public reset(config: TuringMachineConfig) {
    this.transitions = config.transitions
    this.tape = config.input_string.split('')
    this.head = this.tape.indexOf('*') !== -1 ? this.tape.indexOf('*') : 0
    if (this.tape[this.head] === '*') {
      this.tape[this.head] = '_' // Replace '*' with '_'
    }
    this.current_state = config.start_state
    this.steps = 0
    this.halted = false
    this.machine_type = config.machine_type
    this.transition_history = []
  }

  private generateStepOutput(transition_taken?: TransitionTaken): StepOutput {
    return {
      tape: this.getTape(),
      head: this.getHead(),
      current_state: this.getCurrentState(),
      steps: this.getSteps(),
      halted: this.isHalted(),
      transition_taken,
      transitions_traversed: transition_taken ? [transition_taken] : []
    }
  }
}
