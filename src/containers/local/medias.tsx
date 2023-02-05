import { Badge, Box } from '@mui/material';
import { MediaInfo } from 'nstrumenta/dist/browser/client';
import { FC, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../main';
import { LocalMedia } from './media';

export const LocalMedias: FC = () => {
  const client = useContext(ClientContext);
  const [published, setPublished] = useState<MediaInfo[]>([]);

  useEffect(() => {
    client.events.onPublish.subscribe(() => {
      setPublished(client.user!.published);
    });
    client.events.onUnPublish.subscribe(() => {
      setPublished(client.user!.published);
    });
  }, []);

  return (
    <Box>
      <Badge>published</Badge>
      {published.map((info) => (
        <LocalMedia info={info} key={info.mediaId} />
      ))}
    </Box>
  );
};
