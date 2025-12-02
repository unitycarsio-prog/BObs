export interface RoastResponse {
  roast: string;
}

export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  SAVAGE = 'SAVAGE'
}

export interface NavItem {
  label: string;
  id: string;
}