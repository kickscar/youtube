import React, { Component, Suspense } from "react";
//import { connect } from 'react-redux';


// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Footer = React.lazy(() => import("./Footer"));


// loading
const loading = () => <div className="text-center">Loading...</div>

export default class LayoutUnauthozied extends Component {

    render() {
        console.log("->>>", this.props.children);
        const children = this.props.children || null;
        return (
            <Suspense fallback={loading()}>
                {children}
            </Suspense>
        );
    }
}