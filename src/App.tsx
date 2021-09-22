import { useState } from "react"
//"hoist-non-react-statics/node_modules/@types/react";
import { useQuery } from "react-query";
//components
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Item from "./item/item";
import Drawer from "@material-ui/core/Drawer"
import Cart from "./Cart/Cart";
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"
import LinearProgress from "@material-ui/core/LinearProgress"
//styles
import { Wrapper, StyledButton } from "./App.styles";
import { CartItemType } from "./type";


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://fakestoreapi.com/products')).json()


const App = () => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)


  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {

      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  }
  const handleDrawerClose = () => {
    setCartOpen(false);
  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Ошибка, попробуйте выйти в окно</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
