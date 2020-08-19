export interface IDeleteOne {
  deleteOne: (collectionName: string, collectionParams: Object) => Promise<any>
}
