export interface ISave {
  save: (collectionName: string, collectionInstance: Object) => Promise<any>
}
