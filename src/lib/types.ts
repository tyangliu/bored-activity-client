export interface User {
  name: string;
  accessibility: string;
  price: string;
}

export interface Activity {
  accessibility: string;
  price: string;
  type: string;
  activity: string;
  link: string;
  error?: string;
}
