// Generic type that represents the result of an asynchronous operation. It is a union of 
// two types: T and Error. The T type represents the successful result of 
// the operation, while the Error type represents an error that occurred during the operation.
export type Result<T, Err> =
  | { success: true; value: T }
  | { success: false; message: Err };
