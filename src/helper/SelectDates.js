import React, { Fragment, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { format } from 'date-fns'



const SelectDates = ({ radioButtonHandler }) => {


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
            event.target.value === "Last3Days" && datesFunction(3)
            event.target.value === "week" && datesFunction(7)
            event.target.value === "month" && datesFunction(30)
            event.target.value === "Last45Days" && datesFunction(45)
            event.target.value === "2Months" && datesFunction(60)
            event.target.value === "3Months" && datesFunction(90)
            event.target.value === "none" && radioButtonHandler('', '');

            // event.target.value === "none" ? setStaticDatesBoolean(true) : setStaticDatesBoolean(false);
        }
    }


    return (
        <>
            <div className="form-group col-12 col-md-4 col-xl-2 text-center">
                <label className="h6" htmlFor="selectDates">Quick Search</label>
                <select className="form-control" name="selectDates" id="selectDates"onChange={radioDateHandler}>
                    <option value="none">None</option>
                    <option value="today">Today</option>
                    <option value="Last3Days">Last 3 days</option>
                    <option value="week">Last 1 week</option>
                    <option value="month">Last 1 month</option>
                    <option value="Last45Days">Last 45 days</option>
                    <option value="2Months">Last 2 months</option>
                    <option value="3Months">Last 3 months</option>
                </select>
            </div>
        </>
    )
}


export default SelectDates;