import { Badge, Box } from '@mui/material';
import { MediaInfo } from 'nstrumenta/dist/browser/client';
import { FC, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../..';
import { RemoteMedia } from './media';

export const RemoteMedias: FC = () => {
  const [medias, setMedias] = useState<MediaInfo[]>([]);

  const client = useContext(ClientContext);

  useEffect(() => {
    client.addListener('webrtcPublish', async () => {
      console.log('webrtcPublish event in remote medias');
      const medias = await client.webrtcClient.getMedias();
      console.log('webrtcPublish', medias);
      setMedias(medias);
    });

    client.addListener('webrtcUnPublish', (medias) => {
      console.log('webrtcPublish', medias);
      setMedias(medias);
    });
  }, []);

  return (
    <Box>
      <Badge>medias</Badge>
      {medias.map((info) => (
        <RemoteMedia info={info} key={info.mediaId} />
      ))}
    </Box>
  );
};
