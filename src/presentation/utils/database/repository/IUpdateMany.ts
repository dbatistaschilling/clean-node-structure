export interface IUpdateMany {
  updateMany: (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object) => Promise<any>
}
