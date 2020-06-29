import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { getLoggedInUser } from '../../../util/authUtils';
import Loader from '../common/Loader';


export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: getLoggedInUser()
        };
    }

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row>
                        <Col>
                            <div className="page-title-box">
                                <Row>
                                    <Col lg={7}>
                                        <h4 className="page-title">Welcome, {this.state.user.firstName}</h4>
                                    </Col>
                                    <Col lg={5} className="mt-lg-3 mt-md-0">
                                        
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    Hello this is dashboard content
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}