import { Module } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { StuffController } from './stuff.controller';
import { StuffRepository } from './stuff.repository';
import { StoreModule } from '../store/store.module';

@Module({
    imports: [StoreModule],
    controllers: [StuffController],
    providers: [StuffService, StuffRepository],
})
export class StuffModule {
}
