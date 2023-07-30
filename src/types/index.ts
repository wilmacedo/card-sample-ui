export interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Card {
  id: string;
  cardholder: string;
  number: string;
  cvv: string;
}
