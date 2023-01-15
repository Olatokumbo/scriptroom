export interface ApiError {
  code: number;
  error: string;
}

export function isApiError(x: any): x is ApiError {
  return typeof x.code === "number";
}
