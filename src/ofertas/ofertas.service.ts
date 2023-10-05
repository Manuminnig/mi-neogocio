import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { Oferta } from './entities/oferta.entity';

@Injectable()
export class OfertasService {
  create(createOfertaDto: CreateOfertaDto) {
    const oferta:Oferta = this.ofertaRepository.create(createOfertaDto);
    return this.ofertaRepository.save(oferta);
  }

  @InjectRepository(Oferta)
  private ofertaRepository: Repository<Oferta>

  findAll(){ 
    return this.ofertaRepository.find();
  }

  findOne(id: number) {
    return this.ofertaRepository.findOne({where: { id }} );
  }

  update(id: number, updateOfertaDto: UpdateOfertaDto) {
    this.ofertaRepository.update(id, updateOfertaDto);
    return this.ofertaRepository.findOne({where: { id }});
  }

  async remove(id: number): Promise<void> {
    await this.ofertaRepository.delete(id);
  
  }
}
