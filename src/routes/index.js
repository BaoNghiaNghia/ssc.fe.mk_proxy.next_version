import React, { Suspense, lazy, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import Admin from './admin';
import Customer from './customer';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Spin } from 'antd';

function Coordinator() {
  const { path } = useRouteMatch();

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user?.group?.role);
    }
  }, [user]);

  useEffect(() => {
    console.log('role in coor', role);
  }, [role]);

  return (
    <Router>
      <Switch>
        {/* <Route exact path={`${path}/admin`} component={Admin} />
        <Route exact path={`${path}/customer`} component={Customer} /> */}
        {/* Redirect from /coordinator to /coordinator/admin */}
        {/* <Redirect from={`${path}`} to={`${path}/admin`} /> */}
        <Redirect to="/admin" />
      </Switch>
    </Router>
  );
}

export default Coordinator;
