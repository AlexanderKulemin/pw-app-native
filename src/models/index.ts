export interface IsignIn {
  email: string,
  password: string,
}

export interface IsignUp {
  username: string,
  email: string,
  password: string
}

export interface IauthInitialState {
  username: string,
  email: string,
  isAuth: any,
  token: string,
  error: IError,
}

export interface IRootState {
  auth: IauthInitialState,
  users: IUsersInitialState,
}

export interface IError {
  code: number | null,
  message: string,
}

export interface IUser {
  id: number,
  name: string,
  email?: string,
  balance?: number
}

export interface ITransaction {
  id: number
  date: string,
  username: string,
  amount: number,
  balance: number
}

export interface IUsersInitialState {
  currentUser: IUser,
  users: Array<IUser>,
  transactions: Array<ITransaction>
}