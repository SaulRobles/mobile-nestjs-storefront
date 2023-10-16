export interface Collections {
  getList?: (first?: number, cursor?: string) => string
  getById?: (collectionId: number) => string
  getProducts?: (collectionId: number) => string
}
