import { DomainMiddleware } from './domain.middleware';

describe('DomainMiddleware', () => {
  it('should be defined', () => {
    expect(new DomainMiddleware()).toBeDefined();
  });
});
