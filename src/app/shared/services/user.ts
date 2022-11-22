export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  name: string;
  surname: string;
  gender: string;
  point: number; //(earned points of the user)
  //type: string; (defaultUser, TFFAdmin, teamAdmin)
  team: string; //(from a team list)
  age: Date;
  isAdmin: boolean
}
