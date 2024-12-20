import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return {...each}
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return {...each}
      }),
    }))
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const filteredItem = cartList.filter(each => each.id === product.id)
    console.log(filteredItem.length)
    if (filteredItem.length > 0) {
      this.setState(prevState => {
        const updatedCartList = prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {...each, quantity: each.quantity + 1}
          }
          return {...each}
        })
        return {cartList: updatedCartList}
      })
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
