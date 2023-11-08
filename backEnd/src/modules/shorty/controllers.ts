import { Request, Response } from 'express'
import { DeleteResult } from 'typeorm'
import { getKeyStatusName, getRandomString } from '../../helpers'
import { StatusCode } from '../../helpers/enums'
import { Shorty } from './entities'
import * as shortyRepository from './services'
import { DefaultResponse, ListResponse, ProfileResponse } from './types'

const shortenedChecker = async (shortUrl: string): Promise<Shorty | null> => {
  let result: Shorty | null = null

  try {
    result = await shortyRepository.getShortenedUrl(shortUrl)
  } catch (err) {
    console.error('shortenedChecker', err)
  }

  return result
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const createDTO: Partial<Shorty> = {
    original_url: req.body.original_url,
    shortened_url: '',
    created: new Date()
  }

  let status: number = StatusCode.created
  let responseData: DefaultResponse | undefined

  let shortUrlDoesExist
  do {
    createDTO.shortened_url = getRandomString(5)
    shortUrlDoesExist = await shortenedChecker(createDTO.shortened_url)
  } while (shortUrlDoesExist !== null)

  try {
    await shortyRepository.create(createDTO)
    responseData = {
      status: getKeyStatusName(status)
    }
  } catch (error) {
    const { message } = error as Error
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [message]
    }
  }
  res.status(status).json(responseData)
}

export const profile = async (req: Request, res: Response): Promise<void> => {
  const profileDTO: Partial<Shorty> = {
    shortened_url: req.params.shortened_url
  }

  let status: number = StatusCode.success
  let responseData: ProfileResponse | null

  try {
    const result = await shortyRepository.getShortenedUrl(profileDTO.shortened_url as string)
    if (result !== null) {
      responseData = {
        status: getKeyStatusName(status),
        data: result
      }
    } else {
      status = StatusCode.notFound
      responseData = {
        status: getKeyStatusName(status)
      }
    }
  } catch (error) {
    const { message } = error as Error
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [message]
    }
  }

  res.status(200).json(responseData)
}

export const list = async (req: Request, res: Response): Promise<void> => {
  const listDTO: {
    page: number
  } = {
    page: Number(req.params.page) - 1
  }
  const limit = 7

  let status: number = StatusCode.success
  let responseData: ListResponse | null

  if (listDTO.page > 0) {
    listDTO.page = limit * listDTO.page
  }

  try {
    const shorties = await shortyRepository.getAll(listDTO.page, limit)

    if (shorties[0] !== null && shorties[0]?.length > 0) {
      responseData = {
        status: getKeyStatusName(status),
        data: shorties[0],
        total: shorties[1],
        limit
      }
    } else {
      status = StatusCode.notFound
      responseData = {
        status: getKeyStatusName(status),
        errors: ['Shorty not found']
      }
    }
  } catch (error) {
    const { message } = error as Error
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [message]
    }
  }

  res.status(status).json(responseData)
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  const deleteDTO = {
    shortened_url: req.body.shortened_url
  }

  let status: number = StatusCode.success
  let responseData: DefaultResponse | undefined

  try {
    const shorty: DeleteResult = await shortyRepository.deleteUrl(deleteDTO.shortened_url)

    if (shorty.affected) {
      responseData = {
        status: getKeyStatusName(status)
      }
    } else {
      status = StatusCode.notFound
      responseData = {
        status: getKeyStatusName(status),
        errors: ['No record found']
      }
    }
  } catch (error) {
    const { message } = error as Error
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [message]
    }
  }

  res.status(status).json(responseData)
}
