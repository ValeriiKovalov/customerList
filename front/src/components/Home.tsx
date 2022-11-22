import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Filter from './elements/Filter';
import CustomersTable from './elements/Table';
import { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface IState {
    customers: any[];
    filter: {
        name: string;
        value: string[];
    };
    activeFilter: string;
    syncDone: boolean;
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            customers: [],
            filter: {
                name: 'isActive',
                value: ['All', 'Active', 'Not Active']
            },
            activeFilter: '',
            syncDone: false,
        }
    }

    public componentDidMount(): void {
        axios.get('/customers').then(data => {
            this.setState({ customers: data.data, syncDone: true });
        })
    }

    private handleFilterChange = (e: SelectChangeEvent) => {
        let v = '';

        switch (e.target.value) {
            case 'Active':
                v = 'true';
                break;
            case 'Not Active':
                v = 'false';
                break;
            case 'All':
                v = '';
                break;
            default:
                v = '';
        }

        this.setState({ activeFilter: v === '' ? '' : `isActive=${v}` }, (): void => {
            axios.get(`/customers?${this.state.activeFilter}`).then(data => {
                this.setState({ customers: data.data })
            })
        });
    };

    public deleteCustomer(id: number) {
        axios.delete(`/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex(customer => customer._id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public async fillDatabase() {
        try {
            this.setState({ syncDone: false });
            await axios.post('/initialization');
            const data = await axios.get(`/customers?${this.state.activeFilter}`);
            this.setState({ customers: data.data,  syncDone: true });
        } catch (e) {
            console.error(e);
        }
    }

    public render() {
        const { customers, syncDone } = this.state;
        return (
            <div>
                {customers.length === 0 && syncDone && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )}

                {customers.length === 0 && !syncDone && (
                    <div className="text-center">
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Filter filterName={this.state.filter.name} values={this.state.filter.value} onChange={this.handleFilterChange}/>
                            </Grid>
                            <Grid item xs={6} className="fill-db-button">
                                <IconButton color="primary" aria-label="fill db" onClick={() => this.fillDatabase()}>
                                    <Typography style={{ marginRight: 10 }}>Fill DB</Typography>
                                    <CloudDownloadIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <CustomersTable customers={this.state.customers} deleteCustomerHandler={this.deleteCustomer.bind(this)}/>
                    </div>
                </div>

            </div>
        )
    }
}
