import { NstrumentaBrowserClient, ClientSDK } from 'nstrumenta/dist/browser/client';

export class Client extends ClientSDK {
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