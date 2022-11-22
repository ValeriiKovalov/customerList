import { Component, FormEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';

export interface IValues {
    company?: string;
    industry?: string;
    about?: string;
    isActive?: boolean;
}

export interface IFormState {
    [key: string]: any;
    values: IValues;
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            values: {
                isActive: true
            },
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        axios.post('/customers', this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        });
    }

    private setValues = (values: { [p: string]: string }) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.name]: e.currentTarget.value, });
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Customer </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new Customer
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="company"> Customer company name </label>
                            <input type="text" id="company" onChange={(e) => this.handleInputChanges(e)} name="company" className="form-control" placeholder="Enter customer's company name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="industry"> Industry </label>
                            <input type="text" id="industry" onChange={(e) => this.handleInputChanges(e)} name="industry" className="form-control" placeholder="Enter customer industry" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="about"> About customer </label>
                            <input type="text" id="about" onChange={(e) => this.handleInputChanges(e)} name="about" className="form-control" placeholder="Enter information about customer" />
                        </div>

                        <FormControl>
                            <FormLabel id="controlled-radio-buttons-group">Is customer Active</FormLabel>
                            <RadioGroup
                                id="isActive"
                                aria-labelledby="controlled-radio-buttons-group"
                                name="isActive"
                                value={this.state.values.isActive}
                                onChange={this.handleInputChanges}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Customer
                            </button>
                            {loading &&
                              <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
