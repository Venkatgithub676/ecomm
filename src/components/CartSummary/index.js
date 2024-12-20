// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const price = cartList.reduce(
        (current, acc) => acc.price * acc.quantity + current,
        0,
      )
      console.log(price)
      return (
        <div className="summary-con">
          <h1 className="order-total">
            Order Total: <span className="price">Rs {price}/-</span>
          </h1>
          <p className="cart-length">{cartList.length} Items in cart</p>
          <button type="button" className="check-out-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
