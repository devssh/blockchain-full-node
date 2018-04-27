import React from 'react';
import Greeting from "./presentation/Greeting";
import {get} from './reducer/request';

const {Provider, Consumer} = React.createContext();


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.state = {
            greeting: "Hello World",
            keysHandler: get,
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
                <Greeting/>
            </Provider>
        );
    }
}

export {Consumer};

export default HomePage;