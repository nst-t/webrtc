import { useEffect, useRef } from 'react';
import { ClientSDK, NstrumentaBrowserClient } from 'nstrumenta/dist/browser/client';

class Client extends ClientSDK {
  private readonly nstClient: NstrumentaBrowserClient;
  roomName: string = 'room';

  constructor() {
    super();
    this.nstClient = new NstrumentaBrowserClient();
  }

  async apiJoin() {
    console.log('apiJoin');
    await this.nstClient.connect();
    const { offer, peerId } = await this.nstClient.joinWebRTC(this.roomName);
    const { answer, candidates, user } = await this.join(this.roomName, peerId, offer);
    user.onCandidate.subscribe((candidate) =>
      this.nstClient.candidateWebRTC(peerId, this.roomName, candidate)
    );
    this.nstClient.answerWebRTC(peerId, this.roomName, answer);
    candidates.forEach((candidate) =>
      this.nstClient.candidateWebRTC(peerId, this.roomName, candidate)
    );
  }
}

function App() {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    async function connectAndJoinWebRTC() {
      const client = new Client();
      await client.apiJoin();
      clientRef.current = new Client();
    }

    connectAndJoinWebRTC();
  }, []);

  return <div className="App"></div>;
}

export default App;
