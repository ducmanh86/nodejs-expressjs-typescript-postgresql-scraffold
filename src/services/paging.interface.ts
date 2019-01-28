export default interface IPaging<T> {
  page: number
  count: number
  total_per_page: number
  total_pages: number,
  total_items: number,
  data: T[],
  links: {
    first?: string,
    last?: string,
    next?: string,
    prev?: string
  }
}
