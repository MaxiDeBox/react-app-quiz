import React from "react";
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router';

export function WithRouter(Child) {
  return ( props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    return <Child { ...props } navigate={ navigate } location={ location } params={ params }/>;
  }
}
