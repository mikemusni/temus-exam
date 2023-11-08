import { useCallback, useEffect, useState } from 'react'
import { CreateShorty, ShortyList, createService, listService } from '../../services/api'

export interface ShortyHooks {
  createShorty: (post: CreateShorty) => Promise<boolean>;
  shorties: Omit<ShortyList, 'status' | 'errors'>;
  page: number;
  listShorty: (page: number) => Promise<void>;
  errors: string[];
}

const defaultPage = 1

const useShortyHooks = (): ShortyHooks => {
  const [page, setPage] = useState(defaultPage)
  const [errors, setErrors] = useState<string[]>([])
  const [shorties, setShorties] = useState<Omit<ShortyList, 'status' | 'errors'>>({
    data: [],
    limit: 0,
    total: 0
  })

  const createShorty = useCallback((post: CreateShorty) => {
    return createService(post).then((result: ShortyList) => {
      if (result.status === 'created') {
        setErrors([])
        setPage(defaultPage)
        listShorty(defaultPage)
        return true
      } else {
        setErrors(result.errors)
        return false
      }
    })
  }, [])

  const listShorty = (page: number) => listService(page).then((list) => {
    if (list.status === 'success') {
      setPage(page)
      setShorties({
        data: list.data,
        limit: list.limit,
        total: list.total
      })
    }
  })

  useEffect(() => {
    listShorty(defaultPage)
  }, [])

  return {
    createShorty,
    shorties,
    page,
    listShorty,
    errors
  }
}

export default useShortyHooks
