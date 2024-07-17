declare type TResponse<T = unknown> = {
  status: "OK" | "FAILED";
  message: string;
  data?: T;
  error?: T;
};
