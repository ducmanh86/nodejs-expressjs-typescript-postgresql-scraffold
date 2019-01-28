import {FindOptions} from 'sequelize'

export default interface IRead<T> {
  find (options): Promise<T[]>
  findAndCount(options: FindOptions<T>): Promise<{rows: T[], count: number}>
  findOne (optiions: FindOptions<T>): Promise<T | null>
  count(options): Promise<number>
}
