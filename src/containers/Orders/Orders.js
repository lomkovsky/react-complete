import { Component } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // }
  componentDidMount() {
    // axios.get('/orders.json')
    //   .then((res) => {
    //     const fetchedOrders = [];
    //     for (const key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({loading: false, orders: fetchedOrders})
    //   })
    //   .catch((err) => {
    //     this.setState({loading: false})
    //   })
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render () {
    let orders = (<div>
      {this.props.orders.map(order => (
        <Order 
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}/>
      ))}
      </div>)
    if (this.props.loading) {
      orders = <Spinner />;
    }
    return orders;
    // (
      // <div>
      //   {this.props.orders.map(order => (
      //     <Order 
      //       key={order.id}
      //       ingredients={order.ingredients}
      //       price={order.price}/>
      //   ))}
      // </div>
    // )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
