import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
// import { ProductV1Repository } from './productV1.repository';
// import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const newProduct = {
        name: 'Phone',
        options: [
          {
            name: 'Iphone',
            size: 'LARGE',
            color: 'RED',
          },
          {
            name: 'Iphone',
            size: 'SMALL',
            color: 'YELLOW',
          },
        ],
      };

      const result = {
        id: 1,
        ...newProduct,
      };

      // jest.spyOn(service, 'create').mockImplementation(async () => result);
      // jest.spyOn(service, 'create').mockResolvedValue(result);

      const response = await controller.create(newProduct);
      console.log(response);
      expect(response).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(newProduct);
    });
  });
});
