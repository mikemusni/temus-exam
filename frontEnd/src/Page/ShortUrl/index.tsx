import { Box, Card, CardContent, Hidden } from '@mui/material'
import React from 'react'
import ShortyForm from './Form'
import ShortyList from './List'
import useShortyHooks from './hooks'

const Shorty: React.FC = () => {
  const { createShorty, shorties, page, listShorty, errors } = useShortyHooks()

  return (
    <Box>
      <Hidden mdUp>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <img
            alt='500'
            height={50}
            src='https://www.developer.tech.gov.sg/assets/img/logo_color.svg'
          />
        </Box>
      </Hidden>
      <Card>
        <CardContent>
          <ShortyForm createShorty={createShorty} errors={errors} />
          <Box sx={{ mt: 5 }}>
            <ShortyList
              shorties={shorties}
              page={page}
              listShorty={listShorty}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Shorty
