import React, { Fragment, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { format  } from 'date-fns'



const RadioButtons = ({ radioButtonHandler }) => {


    const radioDateHandler = (event) => {
        const datesFunction = (days) => {
            let date = new Date();
            date.setDate(date.getDate() - days);
            const startDate = format(new Date(date), 'yyyy-MM-dd');
            const endDate = format(new Date(), 'yyyy-MM-dd');
            radioButtonHandler(startDate, endDate);
        }

        if (event.target.value) {
            event.target.value === "today" && datesFunction(0)
            event.target.value === "threeDays" && datesFunction(3)
            event.target.value === "week" && datesFunction(7)
            event.target.value === "month" && datesFunction(30)
            // event.target.value === "none" ? setStaticDatesBoolean(true) : setStaticDatesBoolean(false);
        }
    }


    return (
        <FormControl component="fieldset" >
            <RadioGroup row aria-label="dates" defaultValue="none" name="dates-radio" onChange={radioDateHandler} className="d-flex justify-content-center py-3 align-items-center">
                <FormControlLabel value="none" control={<Radio />} label="None" />
                <FormControlLabel value="today" control={<Radio />} label="Today's" />
                <FormControlLabel value="threeDays" control={<Radio />} label="Last 3 day's" />
                <FormControlLabel value="week" control={<Radio />} label="Last 1 week's" />
                <FormControlLabel value="month" control={<Radio />} label="Last 1 month's" />
            </RadioGroup>
        </FormControl>
    )
}


export default RadioButtons;