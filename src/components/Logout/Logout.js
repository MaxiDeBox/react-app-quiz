import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
import {useNavigate} from "react-router";

const Logout = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    props.logout();
    navigate('/');
  });

  return null;
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
