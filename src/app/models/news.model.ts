import { Timestamp } from "rxjs";

export interface News {
  header: string;
  content: string;
  writtenby: string;
  newsdate: Date;
  tags: Array<String>;
  likes: number;
  dislikes: number;
  nid: string;
  likedUsers: Array<String>;
  dislikedUsers: Array<String>
}
