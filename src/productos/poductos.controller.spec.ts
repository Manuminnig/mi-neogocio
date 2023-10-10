import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

describe('ProductosController', () => {
  let controller: ProductosController;
  const mock={ 
    productos:[
    { 
      id: 1,
      name: "Coca-Cola", 
      description: "Gaseosa 2.5L",
      price: 700,
    },
    { 
      id: 2,
      name: "Spritte", 
      description: "Gaseosa 2.5L",
      price: 700,
    }
    ],
    getAllProductos() { return this.productos }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [ProductosService],
      
    }).overrideProvider(ProductosService).useValue(mock).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  it('should return all products', async () => {
    const result = await controller.getAllProductos();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  
    expect(result[0]).toEqual({
      id: 1,
      name: "Coca-Cola",
      description: "Gaseosa 2.5L",
      price: 700,
    });
  
    expect(result[1]).toEqual({
      id: 2,
      name: "Spritte",
      description: "Gaseosa 2.5L",
      price: 700,
    });
  });

});
