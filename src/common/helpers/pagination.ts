import { Repository, ObjectLiteral } from 'typeorm';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: PaginationOptions,
): Promise<PaginationResult<T>> {
  const { page, limit } = options;
  const [data, total] = await repository.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
  });

  return {
    data,
    total,
    page,
    limit,
  };
}
