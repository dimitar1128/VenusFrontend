import React from 'react';

const Signin = React.lazy(() => import('./components/signin'));

const route = [
    { path: '/signin', exact: true, name: 'Signin', component: Signin }
];

export default route;