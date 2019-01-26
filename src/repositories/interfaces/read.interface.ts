export interface IRead<T> {
  find (options): Promise<T[]>
  findOne (id: string): Promise<T>
}
