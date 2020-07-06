import React, {Component, Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import {routes} from './routes';

import LayoutAuthozied from "./page/common/LayoutAuthozied";
import './assets/scss/App.scss';

// Lazy loading and code splitting
const loading = () => <div></div>

const NonAuthLayout = Loadable({
    loader: () => import('./page/common/LayoutUnauthozied'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading
});

const AuthLayout = Loadable({
    loader: () => import('./page/common/LayoutAuthozied'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading
});

const withLayout = (WrappedComponent) => {
    return class extends Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    {routes.map((route, index) => {
                        return (
                            <route.route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                roles={route.roles}
                                component={() => {
                                    return (
                                        <LayoutAuthozied {...this.props}>
                                            <route.component {...this.props} />
                                        </LayoutAuthozied>);
                                }}
                                // component={withLayout(props => {
                                //   console.log(props);
                                //   const Layout = LayoutAuthozied;
                                //   return (
                                //       <Layout {...props}>
                                //         <route.component {...props} />
                                //       </Layout>
                                //   );
                                // })}
                            />
                        );
                    })}
                </React.Fragment>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
}

export default App;