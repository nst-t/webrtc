import { Badge, Box } from '@mui/material';
import { MediaInfo } from 'nstrumenta/dist/browser/client';
import { FC, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../..';
import { RemoteMedia } from './media';

export const RemoteMedias: FC = () => {
  const [medias, setMedias] = useState<MediaInfo[]>([]);

  const client = useContext(ClientContext);

  useEffect(() => {
    client.events.onConnect.once(() =>
      client.getMedias().then(() => setMedias(Object.values(client.medias)))
    );
    client.events.onPublish.subscribe(() => {
      setMedias(Object.values(client.medias));
    });
    client.events.onUnPublish.subscribe(() => {
      setMedias(Object.values(client.medias));
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
