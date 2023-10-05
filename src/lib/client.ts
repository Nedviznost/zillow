import { createClient } from 'urql'
import dateFormat from 'dateformat'

const HASURA_ADMIN = process.env.HASURA_ADMIN || ''

export const urqlAdminClient = createClient({
  url: 'https://api.nedviznost.mk/v1/graphql',
  fetchOptions: {
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN,
      'Access-Control-Allow-Origin': '*'
    },
  },
})

export const formatDate = (date: string) => dateFormat(date, 'mmm d yyyy HH:MM')
