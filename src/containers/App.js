import React, { Component } from 'react';

import API from 'apisauce'; // ivorySoft

import Layout from '../components/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';

const baseURL = 'https://api-management.ivorysoft.co/' // ivorySoft
const ApiCall = API.create({ 
  baseURL, 
  timeout: 10000,
  // headers: { 'Cache-Control': 'Public' }, 
})// ivorySoft

class App extends Component {

  state = {
    data: 'null'
  }
  _handleGet(){
    ApiCall.get('/')
      .then((Response) => {
        console.log('Response.data ', Response.data)
      })
      .catch(err => console.log(err))
  } // ivorySoft
  _handlePost(){
    ApiCall.post('/admins/login', {
      "email": "lomkovsky@gmail.com",
      "password": "password"})
      .then((Response) => {
        console.log('Response.data ', Response.data.admin)
      })
      .catch(err => console.log(err))

  } // ivorySoft
  render() {
     return (
        <div>
          <Layout>
            <BurgerBuilder />
          </Layout>
          <div>
            <button onClick={this._handleGet}>GET</button>
            <button onClick={this._handlePost}>POST</button>
          </div>
        </div>
      )
  };
};

export default App;
