import { CouncilSlugs } from './councils';

const key = 'voteSelection';

export const setCandidate = (candidate?: string, council?: CouncilSlugs, network?: string) => {
  try {
    if (!candidate || !council || !network) return;
    const parsedSelection = JSON.parse(localStorage.getItem(key) || '{}');
    if (parsedSelection[network]) {
      parsedSelection[network][council] = candidate;
    } else {
      parsedSelection[network] = { [council]: candidate };
    }
    localStorage.setItem(key, JSON.stringify(parsedSelection));
  } catch (error) {
    console.error('tried to add address but wasnt possible', candidate, error);
  }
};

export const removeCandidate = (council?: CouncilSlugs, network?: string) => {
  if (!council || !network) return;
  try {
    const parsedSelection = JSON.parse(localStorage.getItem(key) || '{}');
    delete parsedSelection[network][council];
    localStorage.setItem(key, JSON.stringify(parsedSelection));
  } catch (err) {
    console.error(
      'tried to remove address that wasnt present in local storage: ',
      council,
      network,
      err
    );
  }
};
