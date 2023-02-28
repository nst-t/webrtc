import { Button, Stack } from '@mui/material';
import { FC, useState } from 'react';

export const Selector: FC<{
  button: string;
  onClick: (res: boolean) => void;
}> = ({ button, onClick }) => {
  const [value, setValue] = useState('false');

  return (
    <Stack direction="row" padding={1}>
      <Button onClick={() => onClick(value === 'true' ? true : false)}>{button}</Button>
    </Stack>
  );
};
