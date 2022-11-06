import { createContext, useReducer } from "react";
import { shoppingReducer, initialState } from "../reducer/shoppingReducer";
import { TYPES } from "../reducer/ShoppingAction";
import axios from "axios";

export const CartContex = createContext([]);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  const updateState = async () => {
    const carritoUrl = "https://tired-teal-flip-flops.cyclic.app/Carrito";
    const resCarrito = await axios.get(carritoUrl);
    const carritoListItems = await resCarrito.data;

    dispatch({
      type: TYPES.READ_STATE,
      payload: carritoListItems,
    });
  };

  const addToCart = (producto) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: producto });
  };

  const delFromCart = (id) => {
    dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };
  const incrementProduct = (id) => {
    dispatch({ type: TYPES.INCREMENT, payload: id });
  };
  const decrementProduct = (id) => {
    dispatch({ type: TYPES.DECREMENT, payload: id });
  };

  return (
    <CartContex.Provider
      value={{
        cart: state.cart,
        updateState,
        addToCart,
        delFromCart,
        clearCart,
        decrementProduct,
        incrementProduct,
      }}
    >
      {children}
    </CartContex.Provider>
  );
};

export default CartProvider;
