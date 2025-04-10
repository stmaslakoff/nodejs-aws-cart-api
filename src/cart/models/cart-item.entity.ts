import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ type: 'uuid', name: 'cart_id' })
  cartId: string;

  @PrimaryColumn('uuid')
  @PrimaryColumn({ type: 'uuid', name: 'product_id' })
  productId: string;

  @Column('integer')
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
