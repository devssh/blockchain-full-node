import React from 'react';

const {Provider, Consumer} = React.createContext("");


const HomePage = () => {
    return (
        <Provider value={{hi: "hello world"}}>
            <div>
                <Consumer>
                    {value => (
                        <div>
                            {value.hi}
                        </div>
                    )}
                </Consumer>
            </div>
        </Provider>
    );
};

export default HomePage;