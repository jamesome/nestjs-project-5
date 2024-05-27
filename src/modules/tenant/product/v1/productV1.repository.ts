import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductV1 } from './entities/productV1.entity';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ItemProductDto } from './dto/item-product.dto';
import { OptionV1 } from '../../option/v1/entities/option-v1.entity';

@Injectable()
export class ProductV1Repository {
  private productV1Repository: Repository<ProductV1>;

  constructor(@Inject('CONNECTION') private readonly dataSource: DataSource) {
    this.productV1Repository = this.dataSource.getRepository(ProductV1);
  }

  async create(itemProductDto: ItemProductDto) {
    const products = itemProductDto.items.map((item) => {
      const product = new ProductV1();
      product.name = item.name;
      product.brand = item.brand;
      product.supply = item.supply;

      product.options = item.options.map((optionDto) => {
        const option = new OptionV1();
        option.name = optionDto.name;
        option.size = optionDto.size;
        option.color = optionDto.color;
        return option;
      });

      return product;
    });

    return await this.productV1Repository.save(products);
    // const warehouse = this.productV1Repository.create(itemProductDto);
    // return await this.productV1Repository.save(warehouse);
  }

  async findAll(findProductDto: FindProductDto) {
    const { name, brand, supply } = findProductDto;
    const queryBuilder = this.productV1Repository.createQueryBuilder('product');

    name && queryBuilder.andWhere('product.name = :name', { name });
    brand && queryBuilder.andWhere('product.brand = :brand', { brand });
    supply && queryBuilder.andWhere('product.supply = :supply', { supply });
    queryBuilder.orderBy('product.name', 'ASC');

    return await queryBuilder.getMany();

    // return await this.productV1Repository.find({
    //   relations: {
    //     options: true,
    //     // warehouse: true,
    //   },
    //   // withDeleted: true,
    //   where: { name: 'vvaaa' },
    // });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productV1Repository.update(id, updateProductDto);
  }

  async checkExists(name: string): Promise<boolean> {
    const result = await this.productV1Repository.find({
      where: { name },
    });

    if (result.length) return true;
    return false;
  }
}
