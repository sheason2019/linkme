export interface ServerToClientEvents {
  login: (result: boolean) => void;
  sequenceItem: (items: SequenceItem[]) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  login: (jwt: string) => void;
  sequenceItem: () => void;
}
