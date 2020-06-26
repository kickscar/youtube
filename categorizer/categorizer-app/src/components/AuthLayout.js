import React, { Component, Suspense } from "react";
import { Container } from 'reactstrap';
//import { connect } from 'react-redux';

// temporary
import profilePic from '../assets/images/users/user-1.jpg';

// Code Splitting
const Topbar = React.lazy(() => import("./Topbar"));
const Sidebar = React.lazy(() => import("./Sidebar"));
const RightSidebar = React.lazy(() => import("./RightSidebar"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center"></div>;

const RightSidebarContent = (props) => {
    return <div className="user-box">
        <div className="user-img">
            <img src={profilePic} alt="user-img" title="Nik Patel"
                className="rounded-circle img-fluid" />
            <a href="/" className="user-edit"><i className="mdi mdi-pencil"></i></a>
        </div>

        <h5>{props.user && <a href="/">{props.user.username}</a> }</h5>
        <p className="text-muted mb-0"><small>Founder</small></p>
    </div>
}

export default class AuthLayout extends Component {
    constructor(props) {
        super(props);

        this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isCondensed: false
        }
    }

    signOut(e) {
        e.preventDefault();
        this.props.history.push("/login");
    }

    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({ isCondensed: !this.state.isCondensed });
    }

    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
    }

    render() {
        const children = this.props.children || null;
        return (
            <div className="app">
                <div id="wrapper">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu} />
                        <Sidebar isCondensed={this.state.isCondensed} {...this.props} location={{pathname:''}}/>
                    </Suspense>
                    <div className="content-page">
                        <div className="content">
                            <Container fluid>
                                <Suspense fallback={loading()}>
                                    {children}
                                </Suspense>
                            </Container>
                        </div>
                    </div>
                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>
                </div>
                <Suspense fallback={loading()}>
                    <RightSidebar title={"Settings"}>
                        <RightSidebarContent user={this.props.user} />
                    </RightSidebar>
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user
    }
}
