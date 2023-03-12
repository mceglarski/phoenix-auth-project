export interface UserRefreshResponse<T> {
  readonly data: T;
}

export interface UserRefreshTokenResponse {
  refreshToken: string;
}
