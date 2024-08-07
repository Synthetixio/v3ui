import { CouncilSlugs } from './councils';

export const setCandidate = (candidate?: string, council?: CouncilSlugs, network?: string) => {
  try {
    if (!candidate || !council || !network) return;
    const selection = localStorage.getItem('voteSelection');
    if (!selection) localStorage.setItem('voteSelection', '');
    const parsedSelection = JSON.parse(selection ? selection : '{}');
    if (parsedSelection[network]) {
      parsedSelection[network][council] = candidate;
    } else {
      parsedSelection[network] = { [council]: candidate };
    }
    localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
  } catch (error) {
    console.error('tried to add address but wasnt possible', candidate, error);
  }
};

export const removeCandidate = (council?: CouncilSlugs, network?: string) => {
  if (!council || !network) return;
  try {
    const selection = localStorage.getItem('voteSelection');
    const parsedSelection = JSON.parse(selection ? selection : '{}');
    delete parsedSelection[network][council];
    localStorage.setItem('voteSelection', JSON.stringify(parsedSelection));
  } catch (err) {
    console.error('tried to remove address that wasnt present in local storage: ', err);
  }
};
