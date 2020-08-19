export interface IDeleteMany {
  deleteMany: (collectionName: string, collectionParams: Object) => Promise<any>
}
