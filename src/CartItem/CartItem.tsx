import { Button } from "@material-ui/core";

import { CartItemType, CartItemProps } from "../type";
import Typography from '@material-ui/core/Typography';

import { Wrapper } from "./CartItem.styles";

const CartItem: React.FC<CartItemProps> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <Typography variant="h6" gutterBottom>
        {item.title}
      </Typography>
      {/* <h3></h3> */}
      <img src={item.image} alt={item.title} />
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>

  </Wrapper>
)

export default CartItem