export type GenericError = {
  errors: {
    body: string[];
  }
};
// tslint:disable-next-line:no-any
export function isGenericError(error: any | void): error is GenericError {
  return !!error && 'errors' in error && 'body' in error.errors && Array.isArray(error.errors.body);
}