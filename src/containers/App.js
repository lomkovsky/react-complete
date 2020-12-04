import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import API from 'apisauce'; // ivorySoft

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Logout from './Auth/Logout';
import { authCheckState } from '../store/actions/index';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

//Lazy loading
const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./Auth/Auth');
})

const baseURL = 'https://api-management.ivorysoft.co/' // ivorySoft
const ApiCall = API.create({ 
  baseURL, 
  timeout: 10000,
  // headers: { 'Cache-Control': 'Public' }, 
})// ivorySoft

class App extends Component {
  state = {
    token: 'null',
  }
  _handleGet(){
    ApiCall.get('/')
      .then((Response) => {
        console.log('Response.data ', Response.data)
      })
      .catch(err => console.log(err))
  } // ivorySoft
  _handlePost = () => {
    ApiCall.post('/admins/login', {
      "email": "lomkovsky@gmail.com",
      "password": "password"})
      .then((Response) => {
        this.setState({token: Response.data.token})
        console.log('Response.data ', Response.data.token)
      })
      .catch(err => console.log(err))

  } // ivorySoft
  _handleGetMe = () => {
    ApiCall.setHeaders({
      Authorization: `Bearer ${this.state.token}`
    });
    ApiCall.get('/admins/me')
    // ApiCall.get('/admins/me', {}, { headers: { 'authorization': `Bearer ${this.state.token}` } })
      .then((Response) => {
        console.log('/admins/me Response.data ', Response.data.admin)
      })
      .catch(err => console.log(err))

  } // ivorySoft

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routers = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routers = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
        );
    }
     return (
        <div>
          <Layout>
            {routers}
          </Layout>
          <div>
            <button onClick={this._handleGet}>GET</button>
            <button onClick={this._handlePost}>POST</button>
            <button onClick={this._handleGetMe}>Get ME</button>
          </div>
        </div>
      )
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
