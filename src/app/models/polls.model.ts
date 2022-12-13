import { Timestamp } from "rxjs";

export interface Polls {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    countOpt1: number
    countOpt2: number
    countOpt3: number
    writtenby: string;
    newsdate: Date;
    pid: string;
    UsersPickOpt1: Array<String>;
    UsersPickOpt2: Array<String>;
    UsersPickOpt3: Array<String>;
  }