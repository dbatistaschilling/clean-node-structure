export interface IUpdateOne {
  updateOne: (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object) => Promise<any>
}
