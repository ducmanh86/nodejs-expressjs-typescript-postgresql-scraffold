export default interface IRead<T> {
  find (options): Promise<T[]>
  findOne (id: string): Promise<T | null>
  count(options): Promise<number>
}
