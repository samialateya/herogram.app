import { Vote } from './vote';

export type Poll = {
  id?: string;
  uuid?: string;
  question: string;
  options: string[];
  expiresat: Date;

  votes?: Vote[]
};