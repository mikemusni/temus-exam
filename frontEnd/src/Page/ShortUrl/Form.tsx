import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import AlertMessage from '../../components/Alert'
import { CreateShorty } from '../../services/api'
import { ShortyHooks } from './hooks'

const ShortyForm: React.FC<Partial<ShortyHooks>> = ({
  createShorty,
  errors
}) => {
  const [post, setPost] = useState<CreateShorty>({
    original_url: ''
  })

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setPost({
        ...post,
        [name]: value
      })
    },
    [post]
  )

  const submit = () => {
    if (createShorty) {
      createShorty(post).then((result) => {
        if (result) {
          setPost({
            original_url: ''
          })
        }
      })
    }
  }

  return (
    <>
      <Box sx={{ ml: 1, mb: 1, width: '96%' }} justifyContent='center'>
        <Typography variant='h2' fontWeight='bold' sx={{ mb: 1 }}>
          Shortened your links
        </Typography>
        <Typography variant='h5' fontWeight='normal' sx={{ mb: 2 }}>
          Fill in the fields below to shortened the url.
        </Typography>
      </Box>
      <Box>
        <FormControl fullWidth sx={{ ml: 1, mb: 0, width: '96%' }}>
          <TextField
            label='https://your-website.com'
            name='original_url'
            value={post.original_url}
            onChange={(event) => handleTextFieldChange(event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button variant='contained' onClick={() => submit()}>
                    Make it shorty
                  </Button>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ mt: 1, mb: 2 }}>
        {errors && errors.length > 0
          ? errors.map((message, key) => {
              return <AlertMessage key={key} message={message} />
            })
          : ''}
      </Box>
    </>
  )
}

export default ShortyForm
