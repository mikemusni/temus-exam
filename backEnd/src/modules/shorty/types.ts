import { Shorty } from './entities'

export interface DefaultResponse {
  status: string | undefined
  errors?: string[]
}

export interface ListResponse extends DefaultResponse {
  data?: Shorty[]
  total?: number
  limit?: number
}

export interface ProfileResponse extends DefaultResponse {
  data?: Shorty
}
