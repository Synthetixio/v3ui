import { Input, InputProps } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Wei, wei } from '@synthetixio/wei';

export interface NumberInputProps extends InputProps {
  'data-testid'?: string;
  'data-max'?: string;
}

export const NUMBER_REGEX = /^([0-9]*[.])?[0-9]{0,18}$/;

function cleanupNumber(value: Wei) {
  // Cleanup trailing precision zeroes
  const float = parseFloat(value.toString());
  if (float === value.toNumber()) {
    return `${float}`;
  }
  return value.toString();
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  InputProps,
  dataTestId,
  disabled,
}: {
  onChange?: (value: Wei) => void;
  value: Wei;
  min?: Wei;
  max?: Wei;
  InputProps?: NumberInputProps;
  dataTestId?: string;
  disabled?: boolean;
}) {
  const [inputValue, setInputValue] = useState(value.gt(0) ? value.toString() : '');

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Define max length here
      if (e.target.value.length > 15) return;

      let _value = e.target.value;

      if (!isNaN(Number(e.target.value))) {
        if (!!min && min.gt(Number(e.target.value))) {
          _value = min.toNumber().toString();
        }
      }

      setInputValue(_value);
      if (!onChange) {
        // Could be a read-only input
        return;
      }
      if (!NUMBER_REGEX.test(`${_value}`)) {
        return;
      }
      let nextValue = value;
      try {
        nextValue = wei(_value || 0);
      } catch (_err) {
        // whatever
      }
      if (!value.eq(nextValue)) {
        onChange(nextValue);
      }
    },
    [min, onChange, value]
  );

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!NUMBER_REGEX.test(`${inputValue}`)) {
      ref.current.setCustomValidity('Invalid number');
      return;
    }
    if (value && value.eq(0)) {
      ref.current.setCustomValidity('Value required');
      return;
    }
    if (min && min.gte(0) && value && value.lt(min)) {
      ref.current.setCustomValidity(`Value smaller than minimum of ${cleanupNumber(min)}`);
      return;
    }
    if (max && max.gte(0) && value && value.gt(max)) {
      ref.current.setCustomValidity(`Value greater than maximum of ${cleanupNumber(max)}`);
      return;
    }
    ref.current.setCustomValidity('');
  }, [inputValue, min, max, value]);

  useEffect(() => {
    if (value.eq(0)) {
      return setInputValue('');
    }
    return setInputValue(cleanupNumber(value));
  }, [value]);

  return (
    <Input
      ref={ref}
      flex="1"
      type="number"
      step="any"
      border="none"
      borderWidth="0px"
      textAlign="end"
      p={0}
      outline="none"
      fontFamily="heading"
      fontSize="xl"
      fontWeight="700"
      lineHeight="2xl"
      color="white"
      height="unset"
      autoFocus={true}
      placeholder="00.00"
      _focus={{ boxShadow: 'none !important' }}
      _placeholder={{ color: 'whiteAlpha.700' }}
      _disabled={{ color: 'white' }}
      value={inputValue}
      onChange={onInputChange}
      disabled={disabled}
      data-cy={dataTestId}
      {...InputProps}
      maxLength={10}
    />
  );
}
