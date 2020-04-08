'use strict'

const forAwaitOf = async iterator => {
  let items = []
  for await (const value of iterator) {
    items.push(value)
  }
  return items
}

export const asyncForEach = async (iterator, callback) => {
  for (let index = 0; index < iterator.length; index++) {
    await callback(iterator[index], index, iterator)
  }
}

export default forAwaitOf
