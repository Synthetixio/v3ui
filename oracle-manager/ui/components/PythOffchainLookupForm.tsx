import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const PythOffchainLookupForm: FC<{
  pythAddress: string;
  priceId: string;
  stalenessTolerance: number;
  getValuesFromForm: (pythAddress: string, priceId: string, stalenessTolerance: number) => void;
}> = ({ pythAddress, priceId, stalenessTolerance, getValuesFromForm }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { pythAddress, priceId, stalenessTolerance },
  });
  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(
      getValues('pythAddress'),
      getValues('priceId'),
      getValues('stalenessTolerance')
    );
    // eslint-disable-next-line
  }, [watch()]);
  return (
    <>
      <Text>{ORACLE_NODE_TYPES[8].parameters[0].name}</Text>
      <Input
        {...register('pythAddress')}
        placeholder={ORACLE_NODE_TYPES[8].parameters[0].name}
      ></Input>
      <Text>{ORACLE_NODE_TYPES[8].parameters[1].name}</Text>
      <Input {...register('priceId')} placeholder={ORACLE_NODE_TYPES[8].parameters[1].name} />
      <Text>{ORACLE_NODE_TYPES[8].parameters[2].name}</Text>
      <Input
        {...register('stalenessTolerance')}
        placeholder={ORACLE_NODE_TYPES[8].parameters[2].name}
      />
    </>
  );
};
