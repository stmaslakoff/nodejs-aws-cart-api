import { CartItem } from '../models/cart-item.entity';

export function calculateCartTotal(items: CartItem[]): number {
  return items.length
    ? items.reduce((acc: number, { count }: CartItem) => {
        return (acc += count);
      }, 0)
    : 0;
}
