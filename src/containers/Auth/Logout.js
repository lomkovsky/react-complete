import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../store/actions/index';

const logoutCont = (props) => {
  props.onLogout();
  return <Redirect to="/" />
} 

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(logoutCont);