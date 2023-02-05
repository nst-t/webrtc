import { Button, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { FC, useState } from 'react';

export const Selector: FC<{
  button: string;
  onClick: (res: boolean) => void;
}> = ({ button, onClick }) => {
  const [value, setValue] = useState('false');

  return (
    <Stack direction="row" padding={1}>
      <RadioGroup onChange={setValue as any} value={value}>
        <Stack direction="row">
          <TextField>simulcast</TextField>
          <Radio value="true" aria-label="enable" />
          <Radio value="false" aria-label="disable" />
        </Stack>
      </RadioGroup>

      <Button onClick={() => onClick(value === 'true' ? true : false)}>{button}</Button>
    </Stack>
  );
};
