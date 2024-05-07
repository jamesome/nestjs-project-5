import { ThrotterExceptionFilter } from './throtter-exception.filter';

describe('ThrotterExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ThrotterExceptionFilter()).toBeDefined();
  });
});
