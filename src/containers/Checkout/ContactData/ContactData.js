import {Component} from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = async (event) => {
    event.preventDefault();
      try {
      this.setState({ loading: true });
    // alert('You continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'lom',
        address: {
          street: 'TestStreet',
          country: 'Ukraine',
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    const response = await axios.post('/orders.json', order);
    console.log('response ', response)
    this.props.history.push('/');
    return this.setState({ loading: false });
  } catch (e) {
    console.log('e ----', e)
    return this.setState({ loading: false });
  }
  }

  render () {
    let form = (<form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="text" name="email" placeholder="Your email" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
      <Button 
        btnType="Success"
        clicked={this.orderHandler}>ORDER</Button>
    </form>)
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }

}


export default ContactData;
