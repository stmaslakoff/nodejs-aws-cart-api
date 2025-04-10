import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { Cart } from './models/cart.entity';
import { CartItem } from './models/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), OrderModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
