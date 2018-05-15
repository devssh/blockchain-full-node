import React from 'react';
import {Grid} from "react-bootstrap";
import {request} from './reducer/request';
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";

class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            field5: ""
        };

        this.updateName = this.updateName.bind(this);
        this.updateField1 = this.updateField1.bind(this);
        this.updateField2 = this.updateField2.bind(this);
        this.updateField3 = this.updateField3.bind(this);
        this.updateField4 = this.updateField4.bind(this);
        this.updateField5 = this.updateField5.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
    }

    createTransaction(event) {
        let {name, field1, field2, field3, field4, field5} = this.state;
        if (name.trim().length > 0) {
            request('post', '/createTransaction', {
                name: name,
                fields: [field1, field2, field3, field4, field5],
                email: this.props.state.email,
                sessionToken: this.props.state.sessionToken
            }, (data) => {
            });
            this.setState({name: "", field1: "", field2: "", field3: "", field4: "", field5: ""});
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

    updateField1(event) {
        let b = event.key === "Enter";
        if (b) {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({field1: event.target.value});
        }
    }

    updateField2(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({field2: event.target.value});
        }
    }

    updateField3(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({field3: event.target.value});
        }
    }

    updateField4(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({field4: event.target.value});
        }
    }

    updateField5(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        } else {
            this.setState({field5: event.target.value});
        }
    }

    render() {
        let {email} = this.props.state;
        return (
            <form className={"form-view"} ref={"createContractForm"}>
                <Grid>
                    <TextField label={"Name"} placeholder={"SampleCode30"} onKeyUp={this.updateName}/>
                    <TextField label={"Product"} placeholder={""} onKeyUp={this.updateField1}
                               value={email === "forfive@gmail.com" ? "For Five Coffee Roasters" :
                                   email === "simonsips@gmail.com" ? "Simon Sips" : ""}/>
                    <TextField label={"Discount"} type={"number"} placeholder={""} onKeyUp={this.updateField2}/>
                    <TextField label={"Email1"} placeholder={""} onKeyUp={this.updateField3}/>
                    <TextField label={"Email2"} placeholder={""} onKeyUp={this.updateField4}/>
                    <TextField label={"Email3"} placeholder={""} onKeyUp={this.updateField5}/>
                    <SubmitButton className={"create-contract-button"} value={"Create Coupon"}
                                  onClick={this.createTransaction}/>
                </Grid>

            </form>
        );
    }
}

export default CreateTransaction;