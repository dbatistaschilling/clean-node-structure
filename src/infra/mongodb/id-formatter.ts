export const repositoryResponse = (_doc: any): any => {
  if (_doc) {
    _doc.id = _doc._id
    delete _doc._id
    return _doc
  } else {
    return false
  }
}
