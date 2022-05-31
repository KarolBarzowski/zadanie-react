import { FETCH_BOOKS_BEGIN, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, ADD_TO_CART } from 'actions';

const initialState = {
  cart: [],
  books: [],
  loading: true,
  error: null,
  cartItems: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        books: [],
      };
    case ADD_TO_CART:
      const index = state.cart.findIndex((e) => parseInt(e.id) === parseInt(action.payload.id));

      if (index === -1)
        return {
          ...state,
          cart: [...state.cart, { id: action.payload.id, quantity: 1 }],
          cartItems: state.cartItems + 1,
        };

      return {
        ...state,
        cart: state.cart.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        ),
        cartItems: state.cartItems + 1,
      };

    default:
      return state;
  }
};

export default rootReducer;
