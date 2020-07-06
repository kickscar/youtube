import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { isUserAuthenticated, getLoggedInUser } from './util/authUtils';

const Login = React.lazy(() => import('./page/user/Login'));
const Logout = React.lazy(() => import('./page/user/Logout'));
// const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
// const Register = React.lazy(() => import('./pages/account/Register'));
// const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));

const Dashboard = React.lazy(() => import('./page/dashboard/'));
const Category = React.lazy(() => import('./page/category/'));

const AuthorizedRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={ props => {
        const isAuthTokenValid = isUserAuthenticated();
        if (!isAuthTokenValid) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }

        const loggedInUser = getLoggedInUser();
        if (roles && roles.indexOf(loggedInUser.role) === -1) {
            return <Redirect to={{pathname: '/'}}/>
        }

        return <Component {...props} />
    }}/>
);

const routes = [
    { path: '/login', name: 'Login', component: Login, route: Route },
    { path: '/logout', name: 'Logout', component: Logout, route: Route },

    // {path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route},
    // {path: '/register', name: 'Register', component: Register, route: Route},
    // {path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route},

    { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: AuthorizedRoute, roles: ['Admin'] },
    { path: '/category', name: 'Dashboard', component: Category, route: AuthorizedRoute, roles: ['Admin'] },
    { path: "/", exact: true, component: () => <Redirect to="/dashboard"/>, route: AuthorizedRoute } ];

export { routes, AuthorizedRoute };