import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCode } from '../../helpers/enums'

export const createValidation = async (req: Request, res: Response, next: NextFunction) => {
  const createSchema = yup.object().shape({
    original_url: yup.string().url().required()
  })

  try {
    await createSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(StatusCode.badRequest).json({
        status: error.name,
        errors: error.errors
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const listValidation = async (req: Request, res: Response, next: NextFunction) => {
  const listSchema = yup.object().shape({
    page: yup.number().positive('page must be greater than zero').required()
  })

  try {
    await listSchema.validate(req.params, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(StatusCode.badRequest).json({
        status: error.name,
        errors: error.errors
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const profileValidation = async (req: Request, res: Response, next: NextFunction) => {
  const profileSchema = yup.object().shape({
    shortened_url: yup.string().required()
  })

  try {
    await profileSchema.validate(req.params, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(StatusCode.badRequest).json({
        status: error.name,
        errors: error.errors
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}

export const deleteValidation = async (req: Request, res: Response, next: NextFunction) => {
  const deleteSchema = yup.object().shape({
    shortened_url: yup.string().required()
  })

  try {
    await deleteSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(StatusCode.badRequest).json({
        status: error.name,
        errors: error.errors
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
