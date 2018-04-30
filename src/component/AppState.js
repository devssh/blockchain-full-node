import React from 'react';
import HomePage from "./presentation/HomePage";
import {request} from './reducer/request';

const {Provider, Consumer} = React.createContext();


class AppState extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.state = {
            greeting: "Hello World",
            keysHandler: request,
            setValue: this.setValue,
            keys: {keys:{Dev:[{publicKey:"oh"}]}}
        }
    }

    setValue(value) {
        this.setState({keys:value});
    }

    render() {
        return (
            <Provider value={this.state}>
                <HomePage/>
            </Provider>
        );
    }
}

export {Consumer};

export default AppState;