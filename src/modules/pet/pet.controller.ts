import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) {}

    @Post()
    create(@Body() createPetDto: CreatePetDto) {
        return this.petService.create(createPetDto);
    }

    @Get()
    findAll(@Query('categoryId') categoryId?: number, @Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('isAdopted') isAdopted: boolean = false) {
        console.debug('CategoryId [PetController] ' + categoryId);
        return this.petService.findAll(categoryId, page, limit, isAdopted);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.petService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
        return this.petService.update(+id, updatePetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.petService.remove(+id);
    }

    @Post('adopt')
    async adoptPet(@Query('petId') petId: number, @Query('ownerId') ownerId: number) {
        console.debug('petId [PetController] ' + petId, ownerId);
        return await this.petService.adoptPet(petId, ownerId);
    }
}
