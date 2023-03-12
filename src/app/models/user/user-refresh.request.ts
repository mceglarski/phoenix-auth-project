export interface UserRefreshRequest<T> {
  readonly data: T;
}

export interface UserRefreshTokenRequest {
  readonly refreshToken: string;
}
