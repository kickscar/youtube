import React, { Component, Suspense } from "react";
import { Container } from 'reactstrap';

// temporary
import profilePic from '../../assets/images/users/user-1.jpg';

// Code Splitting
const Topbar = React.lazy(() => import("./Header"));
const Sidebar = React.lazy(() => import("./BarLeftSide"));
const RightSidebar = React.lazy(() => import("./BarRightSide"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center">loading...</div>;

const RightSidebarContent = (props) => {
    return <div className="user-box">
        <div className="user-img">
            <img src={profilePic} alt="user-img" title="관리자" className="rounded-circle img-fluid" />
            <a href="/" className="user-edit"><i className="mdi mdi-pencil"></i></a>
        </div>
        <h5>{props.user && <a href="/">{props.user.username}</a> }</h5>
        <p className="text-muted mb-0"><small>Founder</small></p>
    </div>
}

export default class LayoutAuthozied extends Component {
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
        return (
            <div className="app">
                <div id="wrapper">
                    <Suspense fallback={ loading() }>
                        <Topbar rightSidebarToggle={ this.toggleRightSidebar } menuToggle={ this.toggleMenu } />
                        <Sidebar isCondensed={ this.state.isCondensed } { ...this.props } location={ { pathname: '' } }/>
                    </Suspense>
                    <div className="content-page">
                        <div className="content">
                            <Container fluid>
                                <Suspense fallback={ loading() }>
                                    { this.props.children ? this.props.children : null }
                                </Suspense>
                            </Container>
                        </div>
                    </div>
                    <Suspense fallback={ loading() }>
                        <Footer />
                    </Suspense>
                </div>
                <Suspense fallback={ loading() }>
                    <RightSidebar title={ "Settings" }>
                        <RightSidebarContent user={ this.props.user } />
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
