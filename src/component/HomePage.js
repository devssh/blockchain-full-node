import React from 'react';
import Greeting from "./presentation/Greeting";

const {Provider, Consumer} = React.createContext("");


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            greeting: "Hello World"
        }
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