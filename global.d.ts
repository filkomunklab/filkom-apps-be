declare type TResponse<T = undefined> = {
  status: "SUCCESS" | "FAILED";
  message: string;
  data?: T;
  error?: T;
};
