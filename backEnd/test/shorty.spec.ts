/* eslint-disable no-undef */
import request from 'supertest'
import { InsertResult } from 'typeorm'
import uuid from 'uuid-random'
import app from '../src/config'
import * as ShortyService from '../src/modules/shorty/services'

describe('Create shorty', () => {
  it('given URL is not defined', async () => {
    const { body } = await request(app)
      .post('/shorty')
      .send({
        original_url: ''
      })
      .expect(400)

    expect(body).toEqual({
      status: 'ValidationError',
      errors: ['original_url is a required field']
    })
  })

  it('given URL is not in correct format', async () => {
    const { body } = await request(app)
      .post('/shorty')
      .send({
        original_url: 'abc.com'
      })
      .expect(400)

    expect(body).toEqual({
      status: 'ValidationError',
      errors: ['original_url must be a valid URL']
    })
  })

  it('given URL is correct url format', async () => {
    const created = new Date()
    const shortyId = uuid()
    const mockResult = {
      identifiers: [{ shortyId }],
      generatedMaps: [
        {
          shortyId,
          created
        }
      ],
      raw: [
        {
          shortyId,
          created
        }
      ]
    }

    jest.spyOn(ShortyService, 'create').mockReturnValue(Promise.resolve<InsertResult>(mockResult))
    const sendRequest = {
      original_url: 'http://test.com'
    }

    const { body } = await request(app)
      .post('/shorty')
      .send(sendRequest)
      .expect(201)

    expect(body).toEqual({
      status: 'created'
    })
  })
})
