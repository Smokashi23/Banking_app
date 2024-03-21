
export interface User {
  name: string;
  mobile: string;
  email: string;
  password: string;
  address: string;
  role: string;
}

export interface Account {
  branch_id: number;
  acc_type: string;
  balance: number;
}

export interface LoginData {
  username: string;
  password: string;
}

