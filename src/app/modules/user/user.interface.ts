import { status } from 'http-status';

export type TUserFilterRequest={
  email?:string | undefined,
  role?:string | undefined,
  status?:string|undefined,
  searchTerm?: string | undefined
} ;

export type TChangeStatus={
  status:string
}