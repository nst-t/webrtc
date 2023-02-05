import { Box, Button, Stack, TextField } from '@mui/material';
import { MCU, MediaInfo } from 'nstrumenta/dist/browser/client';
import { FC, LegacyRef, useContext, useEffect, useRef, useState } from 'react';
import { ClientContext } from '../../main';

export const Mixer: FC<{ medias: MediaInfo[]; mixer: MCU }> = ({ mixer, medias }) => {
  const client = useContext(ClientContext);
  const audioRef = useRef<HTMLAudioElement>();
  const [listen, setListen] = useState<MediaInfo[]>([]);

  useEffect(() => {
    const stream = Object.values(client.streams).find((v) => v.info.publisherId === mixer.id)
      ?.stream as MediaStream;
    audioRef.current!.srcObject = stream;
    client.events.onTrack.subscribe((stream, info) => {
      if (info.publisherId === mixer.id) {
        audioRef.current!.srcObject = stream;
      }
    });
    mixer.onAdded.subscribe(() => setListen(Object.values(mixer.infos)));
    mixer.onRemoved.subscribe(() => setListen(Object.values(mixer.infos)));
  }, []);

  return (
    <Box key={mixer.id} p={1}>
      <audio ref={audioRef as LegacyRef<HTMLAudioElement>} autoPlay />
      <TextField>mixerId {mixer.id}</TextField>
      <Stack direction="row">
        <TextField>mixing list</TextField>
        {listen.map((v) => (
          <TextField key={v.mediaId}>{v.mediaId}</TextField>
        ))}
      </Stack>
      {medias
        .filter((v) => v.kind === 'audio')
        .map((info) => (
          <Box key={info.mediaId} padding={1}>
            {Object.entries(info).map(([k, v]) => (
              <TextField key={k}>
                {k} : {v.toString()}
              </TextField>
            ))}
            <Stack direction="row">
              <Button onClick={() => client.addMixedAudioTrack(mixer.id, info)}>add</Button>
              <Button onClick={() => client.removeMixedAudioTrack(mixer.id, info)}>remove</Button>
            </Stack>
          </Box>
        ))}
    </Box>
  );
};
