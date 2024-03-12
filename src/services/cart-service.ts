import { OrderDTO } from "../components/models/order";
import * as cartRepository from '../localstorage/cart-repository';

export function saveCart(cart: OrderDTO){
    cartRepository.save(cart);

}

export function getCard() : OrderDTO{
    return cartRepository.get()
}