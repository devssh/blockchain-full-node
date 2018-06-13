import React from 'react';
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
            field5: "",
            field6: "$"
        };

        this.updateName = this.updateName.bind(this);
        this.updateField1 = this.updateField1.bind(this);
        this.updateField2 = this.updateField2.bind(this);
        this.updateField3 = this.updateField3.bind(this);
        this.updateField4 = this.updateField4.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
    }

    createTransaction(event) {
        let {name, field1, field2, field3, field4, field5, field6} = this.state;
        if (name.trim().length > 0) {
            request('post', '/createTransaction', {
                name: name,
                fields: [field1, field2, field3, field4, field5, field6],
                email: this.props.state.email,
                sessionToken: this.props.state.sessionToken
            }, (data) => {
            });
            this.setState({name: "", field1: "", field2: "", field3: "", field4: "", field5: "", field6: ""});
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
            var value = '' + event.target.value;
            if (value.startsWith("$")) {
                this.setState({field2: value.substring(1, value.length)});
                this.setState({field6: '$'});
            } else if (value.endsWith("%")) {
                this.setState({field6: '%'});
                this.setState({field2: value.substring(0, value.length - 1)});
            } else {
                this.setState({field6: '$'});
                this.setState({field2: value});
            }

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


    render() {
        let {email} = this.props.state;
        return (
            <form className="create-form-view" ref={"createContractForm"}>
                <div>
                    <TextField label={"NAME"} placeholder={""} onKeyUp={this.updateName} autoFocus/>
                    <TextField label={"PRODUCT"} placeholder={""} onKeyUp={this.updateField1}
                               value={email === "forfive@gmail.com" ? "For Five Coffee Roasters" :
                                   email === "simonsips@gmail.com" ? "Simon Sips" : ""}/>
                    <TextField label={"DISCOUNT"}  placeholder={""} onKeyUp={this.updateField2}/>
                    <TextField label={"PRIMARY EMAIL ADDRESS"} placeholder={""} onKeyUp={this.updateField3}/>
                    <TextField label={"ALTERNATE EMAIL ADDRESS"} placeholder={""} onKeyUp={this.updateField4}/>
                    <div className="add-email-address">
                        + Add email address
                    </div>
                    <div className="button-container">
                        <SubmitButton className="btn btn-primary btn-submit-coupon" value={"Submit"}
                                      onClick={this.createTransaction}/>
                    </div>
                </div>

            </form>
        );
    }
}

export default CreateTransaction;