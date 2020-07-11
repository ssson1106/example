import React from 'react';

const Test = React.lazy(() => import('./views/test/Test'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/test', name: 'Test', component: Test }
];

export default routes;