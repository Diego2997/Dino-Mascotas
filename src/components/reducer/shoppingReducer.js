import { TYPES } from "./ShoppingAction";
import axios from "axios";

export const initialState = {
  cart: [],
};

const agregarProducto = async (id, nombre, img, precio, quantity) => {
  await axios.post("https://tired-teal-flip-flops.cyclic.app/carrito", {
    id: id,
    nombre: nombre,
    img: img,
    precio: precio,
    quantity: quantity,
  });
};

const modificarCantidad = async (id, nombre, img, precio, quantity) => {
  await axios.put(`https://tired-teal-flip-flops.cyclic.app/carrito/${id}`, {
    id: id,
    nombre: nombre,
    img: img,
    precio: precio,
    quantity: quantity,
  });
};

const eliminarProducto = async (id) => {
  await axios.delete(`https://tired-teal-flip-flops.cyclic.app/${id}`);
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_STATE: {
      return {
        ...state,
        cart: action.payload,
      };
    }

    case TYPES.ADD_TO_CART: {
      let itemInCart = state.cart.find((item) => item.id === action.payload.id);

      return itemInCart
        ? (modificarCantidad(
            action.payload.id,
            action.payload.nombre,
            action.payload.img,
            action.payload.precio,
            action.payload.quantity
          ),
          {
            ...state,
            cart: [...state.cart],
          })
        : (agregarProducto(
            action.payload.id,
            action.payload.nombre,
            action.payload.img,
            action.payload.precio,
            action.payload.quantity
          ),
          {
            ...state,
            cart: [...state.cart, { ...action.payload }],
          });
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return (
        eliminarProducto(action.payload),
        {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        }
      );
    }
    case TYPES.INCREMENT: {
      let updatedCart = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          return (
            modificarCantidad(
              curElem.id,
              curElem.nombre,
              curElem.img,
              curElem.precio,
              curElem.quantity + 1
            ),
            { ...curElem, quantity: curElem.quantity + 1 }
          );
        }
        return curElem;
      });
      return { ...state, cart: updatedCart };
    }

    case TYPES.DECREMENT: {
      let updatedCart = state.cart
        .map((curElem) => {
          if (curElem.id === action.payload && curElem.quantity > 1) {
            return (
              modificarCantidad(
                curElem.id,
                curElem.nombre,
                curElem.img,
                curElem.precio,
                curElem.quantity - 1
              ),
              { ...curElem, quantity: curElem.quantity - 1 }
            );
          }
          return curElem;
        })
        .filter((curElem) => curElem.quantity !== 0);
      return { ...state, cart: updatedCart };
    }
    case TYPES.CLEAR_CART:
      // eslint-disable-next-line
      return state.cart.map((item) => eliminarProducto(item.id)), { cart: [] };

    default:
      return state;
  }
}
