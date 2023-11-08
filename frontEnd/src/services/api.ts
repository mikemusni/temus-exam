import axios from 'axios'

export interface ShortyData {
  shortyId: string;
  original_url: string;
  shortened_url: string;
  created: string;
}

export interface ShortyResponse {
  status: string;
  errors: string[];
}

export interface ShortyList extends ShortyResponse {
  data: ShortyData[];
  limit: number;
  total: number;
}

export interface ShortyProfile extends ShortyResponse {
  data: ShortyData
}

export interface CreateShorty {
  original_url: string
}

export const createService = (postAccount: CreateShorty) => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_SHORTY_API}/shorty`,
    data: postAccount
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const listService = (page: number): Promise<ShortyList> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SHORTY_API}/shorty/${page}`
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const profileService = (shortened: string): Promise<ShortyProfile> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SHORTY_API}/shorty/url/${shortened}`
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}
