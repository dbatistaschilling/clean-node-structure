export interface IFind {
  find: (collectionName: string, collectionParams: Object, returnFilters: Object) => Promise<any>
}
