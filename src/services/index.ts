import querystring from 'querystring'
import BaseRepository from '../repositories/base.repository'
import IPaging from './paging.interface'

export default abstract class BaseService<T> {
  protected readonly repo: BaseRepository<T>

  protected constructor(repo: BaseRepository<T>) {
    this.repo = repo
  }

  public paging(params: {
    page: number, size: number, total_items: number,
    protocol: string, host: string, query: string, originalUrl: string, data: T[]
  }): IPaging<T> {
    const _count = params.data.length
    const _total_pages = Math.ceil(_count / params.size)

    const _nextQuery: any = Object.assign({}, params.query)
    const _prevQuery: any = Object.assign({}, params.query)
    const _firstQuery: any = Object.assign({}, params.query)
    const _lastQuery: any = Object.assign({}, params.query)

    _nextQuery.page = params.page + 1
    _prevQuery.page = params.page - 1
    _firstQuery.page = 1
    _lastQuery.page = _total_pages

    const _links: any = {
      base: `${params.protocol}://${params.host}`,
      self: `${params.protocol}://${params.host}${params.originalUrl}`
    }

    _links.first = querystring.stringify(_firstQuery)
    _links.last = querystring.stringify(_lastQuery)

    if (_nextQuery.page <= _total_pages) {
      _links.next = querystring.stringify(_nextQuery)
    }

    if (_prevQuery.page > 0) {
      _links.prev = querystring.stringify(_prevQuery)
    }

    return {
      page: params.page,
      count: _count,
      total_per_page: params.size,
      total_pages: _total_pages,
      total_items: params.total_items,
      data: params.data,
      links: _links
    }
  }
}
