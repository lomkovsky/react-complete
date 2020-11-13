import React from 'react';

const authContext = React.createContext({
  authenticate: false,
  login: () => {}
});

export default authContext;
