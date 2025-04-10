import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../models/cart.entity';
import { CartItem } from '../models/cart-item.entity';
import { PutCartPayload } from 'src/order/type';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: { userId },
      relations: ['items']
    });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const cart = this.cartRepository.create({
      userId,
      items: []
    });
    return await this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let cart = await this.findByUserId(userId);

    if (!cart) {
      cart = await this.createByUserId(userId);
    }

    return cart;
  }

  async updateByUserId(userId: string, payload: PutCartPayload): Promise<Cart> {
    let cart = await this.findOrCreateByUserId(userId);

    const existingItem = cart.items.find(
      item => item.productId === payload.product.id
    );

    if (!existingItem && payload.count > 0) {
      const cartItem = this.cartItemRepository.create({
        productId: payload.product.id,
        count: payload.count,
      });
      cart.items.push(cartItem);
    } else if (existingItem && payload.count === 0) {
      cart.items = cart.items.filter(item => item.productId !== payload.product.id);
      await this.cartItemRepository.remove(existingItem);
    } else if (existingItem) {
      existingItem.count = payload.count;
      await this.cartItemRepository.save(existingItem);
    }

    cart = await this.cartRepository.save(cart);
    return cart;
  }

  async removeByUserId(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      await this.cartRepository.remove(cart);
    }
  }
}
