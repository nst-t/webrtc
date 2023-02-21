import { Box, Button, TextField } from '@mui/material';
import { MediaInfo } from 'nstrumenta/dist/browser/client';
import { ChangeEvent, FC, useContext, useState } from 'react';
import { ClientContext } from '../..';

export const LocalMedia: FC<{ info: MediaInfo }> = ({ info }) => {
  const client = useContext(ClientContext);

  const isData = info.kind === 'application';
  const [data, setData] = useState('');
  const onData = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setData(value);
    client.webrtcClient.sfu.getProducer(info.mediaId).sendData(value);
  };

  return (
    <Box padding={1}>
      {Object.entries(info).map(([k, v]) => (
        <TextField key={k}>
          {k} : {v.toString()}
        </TextField>
      ))}
      {isData && (
        <Box>
          <TextField value={data} onChange={onData} />
        </Box>
      )}
      <Button onClick={() => client.webrtcClient.unPublish(info)}>un publish</Button>
    </Box>
  );
};
