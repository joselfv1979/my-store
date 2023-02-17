import axios from "axios";

export const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data) {
    console.log(error.response?.data);
    return error.response?.data;
  }

  return "Couldn't perform action, try it later!";
};
