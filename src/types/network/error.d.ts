export interface ErrorType {
  data: {
    error: boolean,
    status:number,
    msg: string
  }
}
export interface CustomAxiosError<T> extends AxiosError {
  response?: AxiosResponse<T>
}