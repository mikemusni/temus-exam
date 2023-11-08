import { Container } from '@mui/material'
import React from 'react'
import ShortUrl from '../ShortUrl'

const Home: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <ShortUrl />
    </Container>
  )
}

export default Home
