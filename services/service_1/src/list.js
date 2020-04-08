'use strict'

import middy from '@middy/core'
import cors from '@middy/http-cors'
import { defaultJson, boomErrorHandler } from 'common_lib/middleware'

const handler = async event => {
  return "helllo word"
}

const lambda = middy(handler)
  .use(cors())
  .use(defaultJson())
  .use(boomErrorHandler)

export { lambda as handler }
