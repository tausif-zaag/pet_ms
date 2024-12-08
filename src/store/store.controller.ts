import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {
    }

    @Public()
    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.storeService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storeService.update(+id, updateStoreDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeService.remove(+id);
    }

    @Public()
    @Get('stuffs-list/:id')
    getStuffsByStoreId(@Param('id') id: number) {
        return this.storeService.getStuffsByStoreId(id);
    }
}
