import { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then((response) => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => { this.setState({error}) })
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {...this.props.ings};
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     ingredients: updatedIngredient,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredient);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <=0 ) {
  //     return;
  //   }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredient = {...this.props.ings};
  //     updatedIngredient[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({
  //       ingredients: updatedIngredient,
  //       totalPrice: newPrice,
  //     });
  //     this.updatePurchaseState(updatedIngredient);
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = async () => {
  // const queryParams = [];
  // for (let i in this.props.ings) {
  //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
  // }
  // queryParams.push('price=' + this.state.totalPrice);
  // const queryString = queryParams.join('&');
  // this.props.history.push({
  //   pathname: '/checkout',
  //   search: '?' + queryString,
  // });
  this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />
    if (this.props.ings) {
      orderSummary = <OrderSummary 
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
      ingredients={this.props.ings}/>

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
            <BuildControls 
              disabled={disabledInfo}
              currentPrice={this.props.price}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              ingredientRemoved={this.props.onIngredientRemoved}
              ingredientAdded={this.props.onIngredientAdded}/>
        </Aux>
        );
      }
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
