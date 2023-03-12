export interface FilterSizeQueryModel {
  [key: string]: boolean;
}

export interface FilterSizeModel {
  readonly min: number;
  readonly max?: number
}
