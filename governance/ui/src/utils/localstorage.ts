import { VoteState } from '../context/VoteContext';
import { CouncilSlugs } from './councils';

export const localStorageKey = 'voteSelection';

export const setCandidate = (
  candidate?: string,
  wallet?: string,
  council?: CouncilSlugs,
  network?: string,
  epochId?: string
) => {
  try {
    if (!candidate || !council || !network || !epochId || !wallet) return;

    const parsedSelection = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

    if (!parsedSelection[wallet]) {
      parsedSelection[wallet] = {};
    }

    if (!parsedSelection[wallet][epochId]) {
      parsedSelection[wallet][epochId] = {};
    }
    if (!parsedSelection[wallet][epochId][network]) {
      parsedSelection[wallet][epochId][network] = {};
    }

    parsedSelection[wallet][epochId][network][council] = candidate;

    localStorage.setItem(localStorageKey, JSON.stringify(parsedSelection));
  } catch (error) {
    console.error('Tried to add address but wasn’t possible', candidate, error);
  }
};

export const removeCandidate = (
  council?: CouncilSlugs,
  wallet?: string,
  network?: string,
  epochId?: string
) => {
  if (!council || !network || !epochId || !wallet) return;

  try {
    const parsedSelection = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

    if (
      parsedSelection[wallet] &&
      parsedSelection[wallet][epochId] &&
      parsedSelection[wallet][epochId][network] &&
      parsedSelection[wallet][epochId][network][council]
    ) {
      delete parsedSelection[wallet][epochId][network][council];

      if (Object.keys(parsedSelection[wallet][epochId][network]).length === 0) {
        delete parsedSelection[wallet][epochId][network];
      }
      if (Object.keys(parsedSelection[wallet][epochId]).length === 0) {
        delete parsedSelection[wallet][epochId];
      }
      if (Object.keys(parsedSelection[wallet]).length === 0) {
        delete parsedSelection[wallet];
      }

      localStorage.setItem(localStorageKey, JSON.stringify(parsedSelection));
    }
  } catch (err) {
    console.error(
      'Tried to remove address that wasn’t present in local storage: ',
      council,
      wallet,
      network,
      epochId,
      err
    );
  }
};

export const getVoteSelectionState = (
  state: VoteState,
  wallet?: string,
  epochId?: string,
  networkId?: string,
  councilSlug?: CouncilSlugs
) => {
  if (!epochId || !networkId || !wallet) return '';
  if (councilSlug) {
    return wallet
      ? state[wallet]
        ? epochId
          ? state[wallet][epochId]
            ? networkId
              ? state[wallet][epochId][networkId]
                ? state[wallet][epochId][networkId][councilSlug]
                  ? state[wallet][epochId][networkId][councilSlug]
                  : ''
                : ''
              : ''
            : ''
          : ''
        : ''
      : '';
  }
  return wallet
    ? state[wallet]
      ? epochId
        ? state[wallet][epochId]
          ? networkId
            ? state[wallet][epochId][networkId]
              ? state[wallet][epochId][networkId]
              : ''
            : ''
          : ''
        : ''
      : ''
    : '';
};
