import { useState, useEffect } from 'react';
import { AssetsTable } from './AssetTable';

export const AssetsList = () => {
  const [isLoading, setIsLoading] = useState(true); // TEMP

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return <AssetsTable isLoading={isLoading} />;
};
