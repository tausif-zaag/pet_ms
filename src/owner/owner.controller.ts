import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerService) {
    }

    // Create a new owner
    @Public()
    @Post()
    async create(@Body() createOwnerDto: CreateOwnerDto) {
        try {
            return await this.ownerService.create(createOwnerDto);
        } catch (error) {
            throw error;
        }
    }

    // Get all owners
    @Get()
    async findAll() {
        return await this.ownerService.findAll();
    }

    // Get an owner by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.ownerService.findOne(+id);
    }

    // Update an owner by ID
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
        try {
            return await this.ownerService.update(+id, updateOwnerDto);
        } catch (error) {
            throw error;
        }
    }

    // Delete an owner by ID
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.ownerService.remove(+id);
        } catch (error) {
            throw error;
        }
    }
}
