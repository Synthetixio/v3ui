import { createMachine } from 'xstate';

import StepIntro from './StepIntro';
import StepExplain from './StepExplain';
import StepSummary from './StepSummary';

export const Events = {
  CONFIRM: 'CONFIRM',
  RESET: 'RESET',
} as const;

export const State = {
  intro: 'intro',
  explain: 'explain',
  summary: 'summary',
  migrate: 'migrate',
  complete: 'complete',
} as const;

type StateType = typeof State;
type MachineState =
  | {
      value: StateType['intro'];
      context: Context & { error: null };
    }
  | {
      value: StateType['explain'];
      context: Context & { error: null };
    }
  | {
      value: StateType['summary'];
      context: Context & { error: null };
    }
  | {
      value: StateType['migrate'];
      context: Context & {
        error: null;
      };
    }
  | {
      value: StateType['complete'];
      context: Context & {
        error: null;
      };
    };

type Context = {
  error: null;
};

const initialContext = {
  error: null,
};

export type MigrateEvents =
  | {
      type: 'RESET';
    }
  | { type: 'CONFIRM' };

export const MigrateMachine = createMachine<Context, MigrateEvents, MachineState>({
  id: 'MigrateMachine',
  initial: State.intro,
  predictableActionArguments: true,
  context: initialContext,
  on: {
    [Events.RESET]: {
      target: State.intro,
    },
  },
  states: {
    [State.intro]: {
      meta: {
        component: StepIntro,
      },
      on: {
        [Events.CONFIRM]: [{ target: State.explain }],
      },
    },
    [State.explain]: {
      meta: {
        component: StepExplain,
      },
      on: {
        [Events.CONFIRM]: [{ target: State.summary }],
      },
    },
    [State.summary]: {
      meta: {
        component: StepSummary,
      },
      on: {
        [Events.CONFIRM]: [{ target: State.migrate }],
      },
    },
    [State.migrate]: {
      on: {
        [Events.CONFIRM]: [{ target: State.complete }],
      },
    },
    [State.complete]: {},
  },
});
