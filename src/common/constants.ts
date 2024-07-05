import { HttpStatus as OriginalHttpStatus } from '@nestjs/common';

export enum CustomHttpStatus {
  MULTI_STATUS = 207,
}

export const HttpStatus = {
  ...OriginalHttpStatus,
  ...CustomHttpStatus,
};
