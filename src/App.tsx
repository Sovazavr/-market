import { useState } from "react"
//"hoist-non-react-statics/node_modules/@types/react";
import { useQuery } from "react-query";
//components
import Item from "./item/item";
import Drawer from "@material-ui/core/Drawer"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"
//styles
import { Wrapper } from "./App.styles";
import { CartItemType } from "./type";


const getProducts = async ():Promise<CartItemType[]> => 
  await(await fetch('http://fakestoreapi.com/products')).json()


const App = () => {
  const {data, isLoading, error}=useQuery<CartItemType[]>('products',getProducts)

  const getTotalItems=()=>null

  const handleAddToCart=()=>null

  const handleRemoveFromCart=()=>null

  if(isLoading) return <CircularProgress />
  if(error) return <div>Ошибка, попробуйте выйти в окно</div>

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item=>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
