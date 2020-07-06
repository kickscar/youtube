import React, {Component} from 'react';

export default class View extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Category View - {this.props.name}</h1>
            </React.Fragment>
        );
    }
}