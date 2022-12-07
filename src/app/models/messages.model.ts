export interface Messages{
  mid: string;
  matchCode: string;
  messageOwnerID: string;
  sentWhen: Date;
  content: string;
  likeNumber: number;
  dislikeNumber: number;
  likeList: Array<String>;
  dislikeList: Array<String>;
}
