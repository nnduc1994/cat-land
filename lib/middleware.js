'use strict'

const boom = require('@hapi/boom');
const { Boom } = boom;

/**
 * Middy compatible middleware for sending successful JSON responses
 * @param {number} [statusCode=200]
 */
const defaultJson = (statusCode = 200) => {
  return {
    after: (handler, next) => {
      handler.response = {
        statusCode,
        body: JSON.stringify(handler.response),
        headers: { 'Cache-Control': 'no-store', Pragma: 'no-cache', Expires: '-1' }
      }
      next()
    }
  }
}

/**
 * Middy compatible middleware for sending html responses
 * @param {number} [statusCode=200]
 */
const html = (statusCode = 200) => {
  return {
    after: (handler, next) => {
      handler.response = {
        statusCode,
        headers: { 'Content-type': 'text/html' },
        body: handler.response
      }
      next()
    }
  }
}

const convertToBoomError = error => {
  // pass through boom
  if (error.isBoom) {
    return error
  }

  // convert http-errors
  if (error.statusCode) {
    return new Boom(error.message, error)
  }
  // convert everything else to internal error
  return boom.internal('Internal server error', error)
}

const boomErrorHandler = {
  onError: handler => {
    const error = convertToBoomError(handler.error)
    const { payload } = error.output
    handler.callback(null, {
      statusCode: payload.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*', //TODO: Implement to have this set correctly for each env
        'Cache-Control': 'no-store',
        Pragma: 'no-cache'
      },
      body: JSON.stringify({
        error: {
          code: payload.statusCode,
          message: payload.message
        }
      })
    })
  }
}

const joiValidation = attr => schema => ({
  before: (handler, next) => {
    const data = attr ? handler.event[attr] : handler.event
    const { error } = schema.validate(JSON.parse(data))

    if (error) {
      handler.callback(null, {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
          Pragma: 'no-cache'
        },
        body: JSON.stringify({
          error: {
            code: 400,
            message: error.details[0].message,
            type: error.details[0].type
          }
        })
      })
      return
    }

    next()
  }
})
const joiBodyValidation = joiValidation('body')

module.exports = { defaultJson, boomErrorHandler, html, joiBodyValidation }
