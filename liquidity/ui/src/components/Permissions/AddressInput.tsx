import { CheckIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

type Props = {
  address: string;
  onChange(address: string): void;
  readOnly?: boolean;
  isValidAddress?: boolean;
};

export const AddressInput = ({ address, onChange, readOnly = false, isValidAddress }: Props) => {
  return (
    <FormControl isInvalid={!!address && !isValidAddress}>
      <FormLabel htmlFor="address">Address</FormLabel>
      <InputGroup>
        <Input
          id="address"
          value={address}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          minW="200px"
        />
        {isValidAddress && (
          <InputRightElement>
            <CheckIcon color="success" />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};
