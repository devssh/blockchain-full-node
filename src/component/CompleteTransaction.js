import React from 'react';
import {Grid} from "react-bootstrap";
import {request} from './reducer/request';
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";

class CompleteTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };

        this.updateName = this.updateName.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
    }

    createTransaction(event) {
        let {name} = this.state;
        if (name.trim().length > 0) {
            request('post', '/completeTransaction', {
                name: name
            }, (data) => {
            });
            this.setState({name: ""});
            this.refs.createContractForm.reset();

        }
        event.stopPropagation();
        event.preventDefault();
    };

    updateName(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({name: event.target.value});
        }
    }

    render() {
        return (
            <form className={"form-view"} ref={"createContractForm"}>
                <Grid>
                    <TextField label={"Scan"} placeholder={"Scan"} onKeyUp={this.updateName}/>
                    <SubmitButton className={"create-contract-button"} value={"Complete Transaction"}
                                  onClick={this.createTransaction}/>
                </Grid>

            </form>
        );
    }
}

export default CompleteTransaction;