import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./components/Dashboard/Default'));

const Projects = React.lazy(() => import('./components/Projects/index'));
const Payments = React.lazy(() => import('./components/Payments/index'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/projects', exact: true, name: 'Projects', component: Projects },
    { path: '/payments', exact: true, name: 'Payments', component: Payments },
];

export default routes;