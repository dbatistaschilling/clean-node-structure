export interface IFindOne {
  findOne: (collectionName: string, collectionParams: Object) => Promise<any>
}
