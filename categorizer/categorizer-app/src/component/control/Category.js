import React, {Component} from 'react';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'babo'
        };
    }

    render() {
        return React.createElement(this.props.viewClass, {...this.state});
    }
}