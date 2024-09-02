import { VoteState } from '../context/VoteContext';
import { CouncilSlugs } from './councils';

export const localStorageKey = 'voteSelection';

export const setCandidate = (
  candidate?: string,
  council?: CouncilSlugs,
  network?: string,
  epochId?: string
) => {
  try {
    if (!candidate || !council || !network || !epochId) return;

    const parsedSelection = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

    if (!parsedSelection[epochId]) {
      parsedSelection[epochId] = {};
    }
    if (!parsedSelection[epochId][network]) {
      parsedSelection[epochId][network] = {};
    }

    parsedSelection[epochId][network][council] = candidate;

    localStorage.setItem(localStorageKey, JSON.stringify(parsedSelection));
  } catch (error) {
    console.error('Tried to add address but wasn’t possible', candidate, error);
  }
};

export const removeCandidate = (council?: CouncilSlugs, network?: string, epochId?: string) => {
  if (!council || !network || !epochId) return;

  try {
    const key = 'yourStorageKey'; // Replace with your actual key
    const parsedSelection = JSON.parse(localStorage.getItem(key) || '{}');

    // Ensure the nested structure exists before attempting to delete
    if (
      parsedSelection[epochId] &&
      parsedSelection[epochId][network] &&
      parsedSelection[epochId][network][council]
    ) {
      delete parsedSelection[epochId][network][council];

      // If the object becomes empty after deletion, consider removing the empty objects
      if (Object.keys(parsedSelection[epochId][network]).length === 0) {
        delete parsedSelection[epochId][network];
      }
      if (Object.keys(parsedSelection[epochId]).length === 0) {
        delete parsedSelection[epochId];
      }

      localStorage.setItem(key, JSON.stringify(parsedSelection));
    }
  } catch (err) {
    console.error(
      'Tried to remove address that wasn’t present in local storage: ',
      council,
      network,
      epochId,
      err
    );
  }
};

export const getVoteSelectionState = (
  state: VoteState,
  epochId?: string,
  networkId?: string,
  councilSlug?: CouncilSlugs
) => {
  if (!epochId || !networkId) return '';

  if (councilSlug) {
    return epochId
      ? state[epochId]
        ? networkId
          ? state[epochId][networkId]
            ? state[epochId][networkId][councilSlug]
              ? state[epochId][networkId][councilSlug]
              : ''
            : ''
          : ''
        : ''
      : '';
  }
  return epochId
    ? state[epochId]
      ? networkId
        ? state[epochId][networkId]
          ? state[epochId][networkId]
          : ''
        : ''
      : ''
    : '';
};
