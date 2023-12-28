import { Status } from "types/Message";

// Returns messages to views
export const getMessage = (error?: string, message?: string) => {
  return {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };
};
