import React from 'react';
import {Consumer} from "../HomePage";

const Greeting = () => {
    return (
        <div>
            <Consumer>
                {state => (
                    <div>
                        {state.greeting}
                    </div>
                )}
            </Consumer>
        </div>
    );
};

export default Greeting;