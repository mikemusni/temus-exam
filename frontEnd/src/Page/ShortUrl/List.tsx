import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { ClassNameMap, makeStyles } from '@mui/styles'
import moment from 'moment'
import React, { useCallback } from 'react'
import { ShortyData } from '../../services/api'
import { ShortyHooks } from './hooks'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

const columns = [
  { id: 'original_url', label: 'Original', minWidth: 350 },
  {
    id: 'shortened_url',
    label: 'Shortened',
    minWidth: 300
  },
  {
    id: 'created',
    label: 'Created date',
    minWidth: 200
  }
]

const ShortyList: React.FC<Partial<ShortyHooks>> = ({
  shorties,
  page,
  listShorty
}) => {
  const classes: ClassNameMap<'root' | 'container'> = useStyles()
  const origin = window.location.origin

  const handleChangePage = useCallback(
    (
      _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      if (listShorty) {
        listShorty(newPage + 1)
      }
    },
    []
  )

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shorties?.data.map((shorty: ShortyData) => {
              return (
                <TableRow hover tabIndex={-1} key={shorty.shortyId}>
                  <TableCell>
                    <Link
                      href={shorty.original_url}
                      underline='hover'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {shorty.original_url}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`${origin}/${shorty.shortened_url}`}
                      underline='hover'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {`${origin}/${shorty.shortened_url}`}
                    </Link>
                  </TableCell>
                  <TableCell>{moment(shorty.created).calendar()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component='div'
        count={shorties?.total ? shorties.total : 0}
        rowsPerPage={shorties?.limit ? shorties.limit : 0}
        page={page ? page - 1 : 1}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default ShortyList
