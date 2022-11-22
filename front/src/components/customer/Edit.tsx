import { Component, FormEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface IValues {
    company?: string;
    industry?: string;
    about?: string;
    isActive?: boolean;
}

export interface IFormState {
    id: number,
    customer: any;
    values: IValues;
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: {},
            loading: true,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        this.setState({ loading: true });
        axios.get(`/customers/${this.state.id}`).then(data => {
            this.setState({ customer: data.data, loading: false});
        });


    }

    private processFormSubmission = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`/customers/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: { [p: string]: string }) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.name]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.customer && !loading &&
                  <div>
                    <div>
                      <div className={"col-md-12 form-wrapper"}>
                        <h2> Edit Customer </h2>

                          {submitSuccess && (
                              <div className="alert alert-info" role="alert">
                                  Customer's details has been edited successfully </div>
                          )}

                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                          <div className="form-group col-md-12">
                            <label htmlFor="company"> Customer company name </label>
                            <input type="text" id="company" defaultValue={this.state.customer.company} onChange={this.handleInputChanges} name="company" className="form-control" placeholder="Enter customer's company name" />
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="industry"> Industry </label>
                            <input type="text" id="industry" defaultValue={this.state.customer.industry} onChange={this.handleInputChanges} name="industry" className="form-control" placeholder="Enter customer industry" />
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="about"> About customer </label>
                            <input type="text" id="about" defaultValue={this.state.customer.about} onChange={this.handleInputChanges} name="about" className="form-control" placeholder="Enter information about customer" />
                          </div>

                          <FormControl>
                            <FormLabel id="controlled-radio-buttons-group">Is customer Active</FormLabel>
                            <RadioGroup
                              id="isActive"
                              aria-labelledby="controlled-radio-buttons-group"
                              name="isActive"
                              value={this.state.values.isActive || this.state.customer.isActive}
                              onChange={this.handleInputChanges}
                            >
                              <FormControlLabel value="true" control={<Radio />} label="Yes" />
                              <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                          </FormControl>

                          <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                              Edit Customer </button>
                              {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                              }
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCustomer)
