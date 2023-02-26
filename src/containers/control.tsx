import { Button, Stack } from '@mui/material';
import { Kind } from 'nstrumenta/dist/browser/client';
import { FC, useContext } from 'react';
import { ClientContext } from '..';
import { Selector } from '../components/selector';

export const Control: FC = () => {
  const client = useContext(ClientContext);

  const publishMedia = async (constraints: MediaStreamConstraints) => {
    const [track] = (await navigator.mediaDevices.getUserMedia(constraints)).getTracks();
    await client.webrtcClient.publish({ track, kind: track.kind as Kind });
  };

  const publishDisplay = async () => {
    const [track] = (await (navigator.mediaDevices as any).getDisplayMedia()).getTracks();
    await client.webrtcClient.publish({ track, simulcast: false, kind: track.kind as Kind });
  };

  const publishDataChannel = async () => {
    await client.webrtcClient.publish({ kind: 'application' });
  };

  return (
    <div>
      <Stack direction="row" flexWrap="wrap">
        <Selector button="publish camera" onClick={() => publishMedia({ video: true })} />
        <Selector button="publish display" onClick={() => publishDisplay()} />
        <Button onClick={() => publishMedia({ audio: true })}>publish audio</Button>
        <Button onClick={publishDataChannel}>publish datachannel</Button>
      </Stack>
    </div>
  );
};
