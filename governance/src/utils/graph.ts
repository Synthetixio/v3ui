export async function graphQuery(query: string) {
  const response = await fetch(
    'https://api.thegraph.com/subgraphs/name/rickk137/synthetix-election',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  );
  return response.json();
}
