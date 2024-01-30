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

// https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetixio-governance-subgraph-sepolia/version/v0.0.1/api
// https://subgraph.satsuma-prod.com/ce5e03f52f3b/synthetix/synthetixio-governance-subgraph/version/v0.0.1/api
