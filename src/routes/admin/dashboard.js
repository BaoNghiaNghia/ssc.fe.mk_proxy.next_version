import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Ecommerce = lazy(() => import('../../container/dashboard/Ecommerce'));
const Business = lazy(() => import('../../container/dashboard/Business'));
const Performance = lazy(() => import('../../container/dashboard/Performance'));
const CRM = lazy(() => import('../../container/dashboard/CRM'));
const Overview = lazy(() => import('../../container/dashboard/Overview'));
const Sales = lazy(() => import('../../container/dashboard/Sales'));
const ServerManage = lazy(() => import('../../container/pages/ServerManage'));

function DashboardRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Overview} />
      <Route path={`${path}/tong-quan`} component={Overview} />
      <Route path={`${path}/quan-ly-may`} component={ServerManage} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route exact path={`${path}/eco`} component={Ecommerce} />
      <Route exact path={`${path}/business`} component={Business} />
      <Route exact path={`${path}/performance`} component={Performance} />
      <Route exact path={`${path}/crm`} component={CRM} />
      <Route exact path={`${path}/sales`} component={Sales} />
    </Switch>
  );
}

export default DashboardRoutes;
