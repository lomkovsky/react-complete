import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1})
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedState)
    // }
        // ...state,
        // ingredients: {
        //   ...state.ingredients,
        //   [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        // },
        // totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // };
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredientsRemove = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1})
      const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedStateRemove)
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      })
      // return {
      //   ...state,
      //   ingredients: {
      //     salad: action.ingredients.salad,
      //     bacon: action.ingredients.bacon,
      //     cheese: action.ingredients.cheese,
      //     meat: action.ingredients.meat,
      //   },
      //   totalPrice: 4,
      //   error: false,
      // };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true,
      });
      // return {
      //   ...state,
      //   error: true,
      // };
    default:
      return state;
  }
}

export default reducer;
