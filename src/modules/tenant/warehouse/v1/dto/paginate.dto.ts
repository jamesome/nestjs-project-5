import { IsInt, IsOptional, Max } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  @Max(100)
  limit?: number;
}
