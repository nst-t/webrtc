import { useContext, useEffect, useState } from 'react';
import { ClientContext } from './main';
import { Box, Stack } from '@mui/material';
import { Control } from './containers/control';
import { LocalMedias } from './containers/local/medias';
import { Mixers } from './containers/mcu/mixers';
import { RemoteMedias } from './containers/remote/medias';

function App() {
  const client = useContext(ClientContext);
  const [peerId, setPeerId] = useState('');

  const init = async () => {
    await client.apiJoin();
    client.events.onConnect.subscribe(() => {
      console.log('client onConnect', client);
      setPeerId(client.peerId!);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <span>peerId : {peerId}</span>
      <Stack p={2}>
        <Control />
        <LocalMedias />
        <RemoteMedias />
        <Mixers />
      </Stack>
    </Box>
  );
}

export default App;
