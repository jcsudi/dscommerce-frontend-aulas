export class OrderDTO {
    id?: number;
    items: OrderItemDTO[] = [];
    get total(): number {
    let sum = 0;
    this.items.forEach(item => {
    sum += item.subtotal;
    })
    return sum;
    }
    }
    export class OrderItemDTO {
    constructor(
    public productId: number,
    public quantity: number,
    public name: string,
    public price: number,
    public imgUrl: string
    ) {}
    get subtotal() : number {
    return this.price * this.quantity;
    }
    }