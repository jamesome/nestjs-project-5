import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductV1 } from './entities/productV1.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { OptionV1 } from '../../option/v1/entities/option-v1.entity';

@Injectable()
export class ProductV1Repository {
  private productV1Repository: Repository<ProductV1>;

  constructor(private readonly dataSource: DataSource) {
    this.productV1Repository = this.dataSource.getRepository(ProductV1);
  }

  async create(createProductDto: CreateProductDto) {
    const { name, options } = createProductDto;

    // Create new Product entity
    const product = new ProductV1();
    product.name = name;

    // Create option instances
    product.options = options!.map((optionDto) => {
      const option = new OptionV1();

      option.name = optionDto.name;
      option.size = optionDto.size;
      option.color = optionDto.color;
      option.productV1 = product; // Set the product reference in the option

      return option;
    });

    // Save the product (which will cascade save the options)
    return await this.productV1Repository.save(product);
  }

  find() {
    return this.productV1Repository.find({
      relations: {
        options: true,
      },
    });
  }
}
