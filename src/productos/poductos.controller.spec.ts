import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Oferta } from 'src/ofertas/entities/oferta.entity';

import * as dotenv from 'dotenv';
dotenv.config();

describe('ProductosController', () => {
  let controller: ProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [ProductosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [Producto, Oferta],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Producto]),
      ]
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  it('should return all products', async () => {
    const result = await controller.getAllProductos();
    expect(result).toBeDefined();
  });

});
