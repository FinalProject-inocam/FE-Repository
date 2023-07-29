export interface Login {
  email: string,
  password: string
}

export interface Info {
  success?: boolean,
  info: string,
  error?: null
}