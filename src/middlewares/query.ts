import querystring from 'querystring'

export const paging = (req, res) => {
  const {data} = res.locals

  const nextQuery = Object.assign({}, req.query)
  const prevQuery = Object.assign({}, req.query)
  const firstQuery = Object.assign({}, req.query)
  const lastQuery = Object.assign({}, req.query)

  nextQuery.page = data.page + 1
  prevQuery.page = data.page - 1
  firstQuery.page = 1
  lastQuery.page = data.total_pages

  data.links = {
    base: `${req.protocol}://${req.get('host')}`,
    self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
  }

  if (data.total_items) {
    data.links.first = querystring.stringify(firstQuery)
    data.links.last = querystring.stringify(lastQuery)

    if (nextQuery.page <= data.total_pages) {
      data.links.next = querystring.stringify(nextQuery)
    }

    if (prevQuery.page > 0) {
      data.links.prev = querystring.stringify(prevQuery)
    }
  }

  res.send(data)
}
export const standardize = (req, res) => {
  const result: any = {
    data: res.locals.data
  }
  if (res.locals.data && res.locals.data.length >= 1) {
    result.count = res.locals.data.length
  }
  result.links = {
    base: `${req.protocol}://${req.get('host')}`,
    self: `${req.protocol}://${req.get('host')}${req.originalUrl}`
  }

  res.send(result)
}
