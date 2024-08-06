import { CouncilSlugs } from './councils';

export const setCandidate = (candidate?: string, council?: CouncilSlugs) => {
  if (!candidate || !council) return;
  const selection = localStorage.getItem('voteSelection');
  if (!selection) localStorage.setItem('voteSelection', '');
  const parsedSelection = JSON.parse(selection ? selection : '{}');
  parsedSelection[council] = candidate;
  localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
};

export const removeCandidate = (council: CouncilSlugs) => {
  try {
    const selection = localStorage.getItem('voteSelection');
    const parsedSelection = JSON.parse(selection ? selection : '{}');
    delete parsedSelection[council];
    localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
  } catch (err) {
    console.error('tried to remove address that wasnt present in local storage: ', err);
  }
};

export const getCandidate = (council: CouncilSlugs) => {
  try {
    const selection = localStorage.getItem('voteSelection');
    const parsedSelection = JSON.parse(selection ? selection : '{}');
    return parsedSelection[council] as string;
  } catch (err) {
    console.error('cant get candidate for provided council: ', council, err);
  }
};
