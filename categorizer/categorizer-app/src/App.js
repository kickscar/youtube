import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { routes } from './routes';

// Themes
import './assets/scss/App.scss';
import AuthLayout from "./components/AuthLayout";

// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

const AuthLayout2 = Loadable({
  loader: () => import('./components/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

// configure fake backend
// configureFakeBackend();

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      console.log(this.props);
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}

const f = () => {

  const HOC = class extends Component {
    render() {
      console.log(this.props);
      return (<AuthLayout {...this.props}>
        <route.component {...this.props} />
      </AuthLayout>);
    }
  }

  return HOC;
}

/**
 * Main app component
 */


class App extends Component {


  render() {
    console.log("!!!!!");
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
                      component={ () => {
                        return (<AuthLayout {...this.props}>
                          <route.component {...this.props} />
                        </AuthLayout>);
                      } }
                      // component={withLayout(props => {
                      //   console.log(props);
                      //   const Layout = AuthLayout;
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