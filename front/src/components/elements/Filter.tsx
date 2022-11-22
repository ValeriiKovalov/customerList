import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Iprops {
    filterName: string;
    values: string[];
    onChange: any;
}

export default function Filter(props: Iprops) {
    const { filterName, values, onChange } = props;
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        onChange(event);
    };

    return (
        <Box sx={{ width: 250 }}>
            <Typography>Filter by:</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">{filterName}</InputLabel>
                <Select
                    name={filterName}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="filterName"
                    onChange={handleChange}
                >
                    {values.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
