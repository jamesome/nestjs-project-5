import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductV1 } from './entities/productV1.entity';
import { CreateProductDto } from './dto/create-product.dto';
// import { WarehouseV1 } from '../../warehouse/v1/entities/warehouse-v1.entity';
// import { OptionV1 } from '../../option/v1/entities/option-v1.entity';
// import { WarehouseV1 } from '../../warehouse/v1/entities/warehouse-v1.entity';

@Injectable()
export class ProductV1Repository {
  private productV1Repository: Repository<ProductV1>;
  // private warehouseV1Repository: Repository<WarehouseV1>;

  constructor(private readonly dataSource: DataSource) {
    this.productV1Repository = this.dataSource.getRepository(ProductV1);
    // this.warehouseV1Repository = this.dataSource.getRepository(WarehouseV1);
  }

  async create(createProductDto: CreateProductDto) {
    // {
    //   "name": "아이폰 14",
    //   "options": [
    //     {
    //       "name": "아이1",
    //       "size": "small",
    //       "color": "black"
    //     },
    //     {
    //       "name": "아이2",
    //       "size": "middle",
    //       "color": "blue"
    //     }
    //   ]
    // }
    // {
    //   "name": "아이폰 14123123123",
    //   "warehouse": [
    //     {
    //       "name": "창고1"
    //     },
    //     {
    //       "name": "창고2"
    //     }
    //   ]
    // }
    // const { name } = createProductDto;

    // // Create new Product entity
    // const product = new ProductV1();
    // product.name = name;

    // const options = createProductDto.options?.map(
    //   (createOptionV1Dto) => new OptionV1(createOptionV1Dto),
    // );

    // // const product = new ProductV1({
    // //   name: ...createProductDto,
    // //   options || [],
    // // });

    // const product = new ProductV1({
    //   name: createProductDto.name,
    //   options: options || [], // Ensure options array is initialized
    // });

    // const { name, options } = createProductDto;

    // const product = new ProductV1();
    // product.name = name;

    // if (options) {
    //   product.options = [];
    //   for (const optionDto of options) {
    //     const option = new OptionV1();
    //     option.name = optionDto.name;
    //     option.size = optionDto.size;
    //     option.color = optionDto.color;
    //     option.product = product; // Associate option with product
    //     product.options.push(option); // Add option to product's options
    //   }
    // }

    // const warehouse = new WarehouseV1();
    // const product = new ProductV1();

    // product.name = name;

    // const warehouse = new WarehouseV1({
    //   ...createProductDto.warehouse,
    // });
    // const product = new ProductV1({
    //   ...createProductDto,
    //   warehouse,
    // });

    // // warehouse.product = product; // 명확한 관계 설정

    // return await this.productV1Repository.save(product);

    // WarehouseV1 엔티티 생성
    // const warehouse = this.warehouseV1Repository.create({
    //   name: createProductDto.warehouse.name,
    //   product_id: null, // 기본값으로 설정
    // });

    // // ProductV1 엔티티 생성 및 관계 설정
    // const product = this.productV1Repository.create({
    //   name: createProductDto.name,
    //   warehouse: warehouse,
    // });

    // 저장
    // await this.warehouseV1Repository.save(warehouse);
    // return await this.productV1Repository.save(product);
    return createProductDto;
  }

  async findAll() {
    return await this.productV1Repository.find({
      relations: {
        // options: true,
        // warehouse: true,
      },
    });
  }
}
