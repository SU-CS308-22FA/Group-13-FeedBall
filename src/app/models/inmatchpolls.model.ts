
export interface InMatchPolls {
  impid: string;
  writtenBy: string;
  dateWritten: Date;
  matchId: string;
  pollText: string;
  option1: string;
  option2: string;
  option3: string;
  option1Count: number;
  option2Count: number;
  option3Count: number;
  option1UserList: Array<String>;
  option2UserList: Array<String>;
  option3UserList: Array<String>;
}
