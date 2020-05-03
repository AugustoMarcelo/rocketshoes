import produce from 'immer';

const storaged = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
console.log(storaged);

const INITIAL_STATE = {
  products: storaged ? JSON.parse(storaged) : [],
  adding: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      return produce(state, draft => {
        const { id } = action;
        draft.adding.push(id);
      });
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.products.push(product);
        draft.adding.splice(0, 1);
        localStorage.setItem(
          process.env.REACT_APP_LOCALSTORAGE_KEY,
          JSON.stringify(draft.products)
        );
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
          localStorage.setItem(
            process.env.REACT_APP_LOCALSTORAGE_KEY,
            JSON.stringify(draft.products)
          );
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.products[productIndex].amount = Number(action.amount);
          localStorage.setItem(
            process.env.REACT_APP_LOCALSTORAGE_KEY,
            JSON.stringify(draft.products)
          );
        }

        draft.adding.splice(0, 1);
      });
    }
    case '@cart/UPDATE_AMOUNT_FAILED': {
      return produce(state, draft => {
        draft.adding.splice(0, 1);
      });
    }
    default:
      return state;
  }
}
