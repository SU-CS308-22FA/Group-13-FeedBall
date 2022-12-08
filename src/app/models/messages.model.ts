export interface messages{
  mid: string;
  matchCode: string;
  messageOwnerID: string;
  messageOwnerName: string;
  messageOwnerSurname: string;
  sentWhen: Date;
  content: string;
  likeNumber: number;
  likeList: Array<String>;
}
