export type Result<Ok, Err> =
  | { success: true; value: Ok }
  | { success: false; message: Err };
