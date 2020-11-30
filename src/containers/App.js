import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import API from 'apisauce'; // ivorySoft

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';

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

  render() {
     return (
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
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

export default App;
