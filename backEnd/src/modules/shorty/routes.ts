import express from 'express'
import { create, list, profile, remove } from './controllers'
import { createValidation, deleteValidation, listValidation, profileValidation } from './validation'

const router = express.Router()

router.post('/', createValidation, create)
router.get('/:page', listValidation, list)
router.get('/url/:shortened_url', profileValidation, profile)
router.delete('/', deleteValidation, remove)

export default router
