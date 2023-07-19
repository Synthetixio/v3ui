import { Input, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ORACLE_NODE_TYPES } from '../utils/constants';

export const ConstantForm: FC<{
  constantValue: number;
  getValuesFromForm: (constantValue: number) => void;
}> = ({ getValuesFromForm, constantValue }) => {
  const { register, watch, getValues } = useForm({
    defaultValues: { constantValue },
  });

  useEffect(() => {
    // eslint-disable-next-line
    getValuesFromForm(getValues('constantValue'));
    // eslint-disable-next-line
  }, [watch('constantValue')]);
  return (
    <>
      <Text>{ORACLE_NODE_TYPES[7].parameters[0].name}</Text>
      <Input
        {...register('constantValue', { valueAsNumber: true })}
        placeholder={ORACLE_NODE_TYPES[7].parameters[0].name}
      />
    </>
  );
};
