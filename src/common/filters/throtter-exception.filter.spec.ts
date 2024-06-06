import { ThrottlerExceptionFilter } from './throtter-exception.filter';

describe('ThrotterExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ThrottlerExceptionFilter()).toBeDefined();
  });
});
