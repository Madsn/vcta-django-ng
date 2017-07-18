export interface Trip {
  id?: number;
  date: Date;
  distance: number;
  user: number;
  last_updated?: Date;
}

export interface Team {
  id?: number;
  name: string;
  captain: number;
}

export interface User {
  id?: number;
  username: string;
  full_name: string;
  team?: Team;
  email: string;
  date_joined: any;
}

export interface Config {
  team_management_enabled: boolean;
  trip_management_enabled: boolean;
  flash_message: string;
  welcome_message: string;
}
