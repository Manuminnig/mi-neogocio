import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oferta } from 'src/ofertas/entities/oferta.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>
  ) {

  }

  create(createProductoDto: CreateProductoDto) {
    
    const producto: Producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    const producto = this.productoRepository.find({
      relations: ['oferta'],
    });
    return producto;
  }

  findOne(id: number): Promise<Producto>{
    return this.productoRepository.findOne({ where: { id }, relations:['oferta']});
  
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    this.productoRepository.update(id, updateProductoDto);
    return this.productoRepository.findOne({ where: { id }, relations:['oferta']});
  }

  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }

  async getAllProductos(): Promise<Producto[]> {
    const productos = await this.productoRepository.find();
    return productos;
  }
}
