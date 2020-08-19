export interface IFindById{
  findById: (collectionName: string, id: string) => Promise<any>
}
