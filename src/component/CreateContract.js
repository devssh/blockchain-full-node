import React from 'react';
import {Grid} from "react-bootstrap";
import {request} from './reducer/request';
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";

class CreateContract extends React.Component {
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
        this.createContract = this.createContract.bind(this);
    }

    createContract(event) {
        let {name, field1, field2, field3, field4, field5} = this.state;
        if (name.trim().length > 0) {
            request('post', '/createContract', {
                name: name,
                fields: [field1, field2, field3, field4, field5]
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
        return (
            <form className={"form-view"} ref={"createContractForm"}>
                <Grid>
                    <TextField label={"Name"} placeholder={"My Contract"} onKeyUp={this.updateName}/>
                    <TextField label={"Field1"} placeholder={""} onKeyUp={this.updateField1}/>
                    <TextField label={"Field2"} placeholder={""} onKeyUp={this.updateField2}/>
                    <TextField label={"Field3"} placeholder={""} onKeyUp={this.updateField3}/>
                    <TextField label={"Field4"} placeholder={""} onKeyUp={this.updateField4}/>
                    <TextField label={"Field5"} placeholder={""} onKeyUp={this.updateField5}/>
                    <SubmitButton className={"create-contract-button"} value={"Create Contract"}
                                  onClick={this.createContract}/>
                </Grid>

            </form>
        );
    }
}

export default CreateContract;