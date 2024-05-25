// import { DataSource } from 'typeorm';
// import WarehouseV1Seeder from './warehouseV1.seeder';

// describe('WarehouseV1Seeder', () => {
//   let seeder: WarehouseV1Seeder;
//   let dataSource: DataSource;

//   beforeAll(() => {
//     const mockDataSource = {
//       type: 'mysql',
//       host: jest.fn(),
//       port: jest.fn(),
//       database: jest.fn(),
//       entities: jest.fn(),
//       username: jest.fn(),
//       password: jest.fn(),
//       synchronize: jest.fn(),
//       logging: jest.fn(),
//       migrations: jest.fn(),
//       migrationsTableName: jest.fn(),
//     };

//     dataSource = new DataSource(mockDataSource);
//     seeder = new WarehouseV1Seeder();
//   });

//   it('should seed warehouses correctly', async () => {
//     // Given
//     const mockWarehouseV1Repository = {
//       save: jest.fn(),
//     };
//     const mockProductV1Factory = {
//       saveMany: jest.fn(() => [{ id: 1 }, { id: 2 }]), // 적절한 모의 반환 값으로 수정
//     };
//     const mockWarehouseV1Factory = {
//       make: jest.fn(() => ({ id: 1 })), // 적절한 모의 반환 값으로 수정
//     };

//     jest
//       .spyOn(dataSource, 'getRepository')
//       .mockReturnValue(mockWarehouseV1Repository);
//     jest
//       .spyOn(seeder as any, 'productV1Factory', 'get')
//       .mockReturnValue(mockProductV1Factory);
//     jest
//       .spyOn(seeder as any, 'warehouseV1Factory', 'get')
//       .mockReturnValue(mockWarehouseV1Factory);

//     // When
//     await seeder.run(dataSource, { get: jest.fn() });

//     // Then
//     expect(mockProductV1Factory.saveMany).toHaveBeenCalledWith(2);
//     expect(mockWarehouseV1Factory.make).toHaveBeenCalledTimes(2); // 만약 products.map이 빈 배열을 반환한다면 0으로 수정
//     expect(mockWarehouseV1Repository.save).toHaveBeenCalledWith([
//       { id: 1 },
//       { id: 1 },
//     ]);
//   });
// });
