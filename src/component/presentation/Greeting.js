import React from 'react';
import {Consumer} from "../HomePage";

const Greeting = () => {
    return (
        <div>
            <Consumer>
                {state => (
                    <div>
                        {state.greeting}
                        <br/>
                        {state.keys.keys.Dev[0].publicKey==="oh"?state.keysHandler('k', state.setValue):""}
                        {state.keys.keys.Dev[0].publicKey}
                    </div>
                )}
            </Consumer>
        </div>
    );
};

export default Greeting;