import { Equal } from 'typeorm'
import dataSource from '../../ormConfig'
import { Shorty } from './entities'

const shortyRepository = dataSource.getRepository(Shorty)

export const create = async (createDTO: Partial<Shorty>) => {
  return await shortyRepository.insert(Object.assign(new Shorty(), createDTO))
}

export const getShortenedUrl = async (shortenedUrl: string) => {
  return await shortyRepository.findOne({
    where: {
      shortened_url: Equal(shortenedUrl)
    }
  })
}

export const getAll = async (skip: number, take: number) => {
  return await shortyRepository.findAndCount({
    order: {
      created: 'desc'
    },
    skip,
    take
  })
}

export const deleteUrl = async (shortenedUrl: string) => {
  return await shortyRepository.delete({
    shortened_url: shortenedUrl
  })
}
