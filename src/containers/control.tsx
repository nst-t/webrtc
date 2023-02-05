import { Button, Stack } from '@mui/material';
import { Kind } from 'nstrumenta/dist/browser/client';
import { FC, useContext } from 'react';
import { Selector } from '../components/selector';
import { ClientContext } from '../main';
import { getAudioStream } from '../util';

export const Control: FC = () => {
  const client = useContext(ClientContext);

  const publishMedia = async (simulcast: boolean, constraints: MediaStreamConstraints) => {
    const [track] = (await navigator.mediaDevices.getUserMedia(constraints)).getTracks();
    await client.publish({ track, simulcast, kind: track.kind as Kind });
  };

  const publishDisplay = async (simulcast: boolean) => {
    const [track] = (await (navigator.mediaDevices as any).getDisplayMedia()).getTracks();
    await client.publish({ track, simulcast, kind: track.kind as Kind });
  };

  const publishFile = async (file: File) => {
    const stream = await getAudioStream(await file.arrayBuffer(), 0.1);
    const [track] = stream.getTracks();
    await client.publish({ track, kind: track.kind as Kind });
  };

  const publishDataChannel = async () => {
    await client.publish({ kind: 'application' });
  };

  const createMixer = () => {
    client.listenMixedAudio([]);
  };

  return (
    <div>
      <Stack direction="row" flexWrap="wrap">
        <Selector button="publish camera" onClick={(res) => publishMedia(res, { video: true })} />
        <Selector button="publish display" onClick={(res) => publishDisplay(res)} />
        {/* <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onSelect={publishFile}
        /> */}
        <label htmlFor="raised-button-file">
          <Button component="span">Upload</Button>
        </label>

        <Button onClick={() => publishMedia(false, { audio: true })}>publish audio</Button>
        <Button onClick={publishDataChannel}>publish datachannel</Button>
        <Button onClick={createMixer}>create Mixer</Button>
      </Stack>
    </div>
  );
};
