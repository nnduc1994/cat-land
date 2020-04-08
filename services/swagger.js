import fs from 'fs'
import middy from 'middy'
import yaml from 'yaml'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { defaultJson } from 'lib/middleware'

const lambda = async () => {
  const doc = fs.readFileSync('resources/docs/swagger.yml', 'utf8')
  return yaml.parse(doc)
}

const handler = middy(lambda)
  .use(cors())
  .use(defaultJson())
  .use(httpErrorHandler()) // handles common http errors and returns proper responses

export { handler }
