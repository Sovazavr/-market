export type CartItemType = {
    id: number,
    category: string,
    description: string,
    image: string,
    price: number,
    title: string,
    amount: number
}

export type Props = {
    item: CartItemType,
    handleAddToCart: (clickedItem: CartItemType)=>void
}

export type CartProps = {
    cartItems: CartItemType[],
    addToCart: (clickedItem: CartItemType)=> void,
    removeFromCart: (id: number)=>void
}

export type CartItemProps={
    item: CartItemType,
    addToCart: (clickedItem: CartItemType)=>void,
    removeFromCart:(id:number)=>void
}