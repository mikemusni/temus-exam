import { act, fireEvent, render, within } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ShortUrl from '../../../Page/ShortUrl'

const mock = new MockAdapter(axios)

describe('Shorty form', () => {
  beforeAll(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
    mock.onGet(`${process.env.REACT_APP_SHORTY_API}/shorty/1`).reply(400, {
      status: '',
      errors: []
    })
  })

  it('should display component', () => {
    const { getByText } = render(<ShortUrl />)

    expect(getByText('Shortened your links')).toBeInTheDocument()
    expect(
      getByText('Fill in the fields below to shortened the url.')
    ).toBeInTheDocument()
    expect(getByText('Make it shorty')).toBeInTheDocument()
  })

  it('when user submit and input field is empty', async () => {
    mock.onPost(`${process.env.REACT_APP_SHORTY_API}/shorty`).reply(400, {
      status: '400',
      errors: ['original_url is a required field']
    })
    const { getByText } = render(<ShortUrl />)
    const submitButton = getByText('Make it shorty')
    fireEvent.click(submitButton)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })
    expect(
      await getByText('original_url is a required field')
    ).toBeInTheDocument()
  })
})

describe('Shorty list', () => {
  beforeAll(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
    mock.onGet(`${process.env.REACT_APP_SHORTY_API}/shorty/1`).reply(400, {
      status: '',
      errors: []
    })
  })

  it('display shortened url', async () => {
    mock.onGet(`${process.env.REACT_APP_SHORTY_API}/shorty/1`).reply(200, {
      status: 'success',
      data: [
        {
          shortyId: 'some-random-uuid',
          original_url: 'https://musni.net',
          shortened_url: 'MbR5d',
          created: '2023-11-08T04:43:29.885Z'
        }
      ],
      total: 1,
      limit: 7
    })
    const { getByText, findByRole } = render(<ShortUrl />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })
    const tableBodyRow = await findByRole('table')
    const tbody = within(tableBodyRow).getAllByRole('rowgroup')[1]
    const rows = within(tbody).getAllByRole('row')

    expect(await rows).toHaveLength(1)
    expect(await getByText('https://musni.net')).toBeInTheDocument()
    expect(await getByText('http://localhost/MbR5d')).toBeInTheDocument()
  })
})
