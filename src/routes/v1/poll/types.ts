export type PollRequest = {
  question: string;
  options: string[];
  expiresAt: Date;
};