export interface Trip {
  id?: number;
  date: Date;
  distance: number;
  user: number;
  last_updated?: Date;
}

export interface User {
  id?: number;
  username: string;
  full_name: string;
  team?: string;
  email: string;
  date_joined: any;
}
