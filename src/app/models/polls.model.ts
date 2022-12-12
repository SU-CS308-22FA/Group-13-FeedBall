import { Timestamp } from "rxjs";

export interface Polls {
    activitySit: boolean;
    inmatchSit: boolean;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    percentageOpt1: number
    percentageOpt2: number
    percentageOpt3: number
    writtenby: string;
    newsdate: Date;
    tags: Array<String>;    // not sure what it is for, ask Selin //
    pid: string;
    UsersPickOpt1: Array<String>;
    UsersPickOpt2: Array<String>;
    UsersPickOpt3: Array<String>;
  }