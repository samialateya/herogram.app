export type Vote = {
  id?: string;
  uuid?: string;
  userId: string;
  pollId: string;
  vote: number
  createdAt?: Date;
};