/*eslint-disable*/
import React, { useState, Fragment } from 'react';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import { AiFillStar } from 'react-icons/ai';

export const Input = (props) => {
    const { name, label, required, handler, value, readOnly } = props;

    return <div className="form-group col-12 col-md-6 col-xl-4">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control" name={name}   >
                {({ field, form, meta }) => {
                    // console.log(value)
                    return (
                        <div>
                            {
                                value !== undefined ? 
                                    <input type="text" id={name} {...field} readOnly={readOnly} value={value && value} onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control" />
                                    :
                                    <input type="text" id={name} {...field} readOnly={readOnly} value={form.values[name] ? form.values[name] : ''}  onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control" />
                            }

                        </div>
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

export const Select = (props) => {
    const { name, label, required, children, handler } = props;


    return <div className=" form-group col-12 col-md-6 col-xl-4 ">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field as='select' name={name}  >
                {({ field, form, meta }) => {
                    return (
                        <div>
                            <select type="text" id={name} {...field} onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control" >
                                {children}
                            </select>
                        </div>
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

// 
export const DefaultInput = (props) => {
    const { name, label, required } = props;
    return <div className="form-group col-12 col-md-4 col-xl-3">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control text-uppercase" id={name} name={name} readOnly />
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

export const DefaultSelect = (props) => {
    const { name, label, required, children } = props;


    return <div className=" form-group col-12 col-md-6 col-xl-4 ">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field as='select' className="form-control w-100" name={name} id={name} readOnly>
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}
export const PermanentInput = (props) => {
    const { name, label, required, present, present_name } = props;

    return <div className="form-group col-12 col-md-6 col-xl-4">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control" name={name}  >
                {({ field, form, meta }) => {

                    if (present) {
                        meta.touched = true
                        meta.initialTouched = true
                        meta.error = undefined;
                        form.touched[name] = true;
                    }
                    return (
                        <div>
                            {
                                present ?  <input {...field}   type="text" id={name} className="form-control"  value={form.values[present_name]}  />
                                : <input  {...field} type="text" id={name} className="form-control"   />
                            }
                            
                        </div>
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

export const AadharInput = (props) => {
    const { name, label, required } = props;

    return <div className="form-group col-12 col-md-6 col-xl-4">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control" name={name} id={name} />
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}



export const OptionsSelect = (props) => {
    const { name, label, required, children, handler, options, key1, key2, key3 } = props;


    return <div className=" form-group col-12 col-md-6 col-xl-4 ">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field as='select' name={name}  >
                {({ field, form, meta }) => {
                    return (
                        <div>
                            <select type="text" id={name} {...field} onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control" >
                                <option value="">Select</option>
                                {
                                    options?.map((value, index) => {
                                        return <option key={index} className="text-uppercase" value={key1 ? value[key1] : value}>{key2 ? value[key2] : value} {key3 && value[key3]}</option>
                                    })
                                }
                            </select>
                        </div>
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

export const DateField = (props) => {
    const { name, label, required, handler, minDate, value, disabled } = props;

    return <div className="form-group col-12 col-md-6 col-xl-4">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control" name={name} >
                {({ field, form, meta }) => {
                    return (
                        <div>
                            {
                                value ?  <input type="date" {...field} disabled={disabled} id={name} min={minDate && minDate} value={value && value} onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control  cursor-pointer"  />
                                : 
                                <input type="date" {...field} disabled={disabled} id={name} min={minDate && minDate}  value={form.values[name] ? form.values[name] : ''}  onChange={(e) => { form.handleChange(e); handler && handler(e.target.value) }} className="form-control  cursor-pointer" />
                            }
                        
                        </div>
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

export const GiveInput = (props) => {
    const { name, label, required, value } = props;

    return <div className="form-group col-12 col-md-6 col-xl-4">
        <div className="p-1">
            <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{ color: "red", width: "8px" }} /> : null}</label>
        </div>
        <div>
            <Field className="form-control" name={name} >
                {
                    ({ field, form }) => {
                        if (value) {
                            form.values[name] = value.toString();
                        }
                        return <input type="text" id={name} className="form-control" readOnly value={value} />
                    }
                }
            </Field>
            <ErrorMessage name={name} render={message => <p className="text-danger text-center">{message}</p>} />
        </div>
    </div>
}

// export const DateField2 = (props) => {
//     const { name, label, required, disabled } = props;
//     function getYears(startYear) {
//         let currentYear = new Date().getFullYear();
//         let years = [];
//         startYear = startYear || 1980;  
//         while ( startYear <= currentYear ) {
//             years.push(startYear++);
//         }   
//         return years;
//     }
//     const years = [...getYears(1950)]
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     return<div className=" form-group col-12 col-md-6 col-xl-4">
//                     <div className="p-1">
//                         <label htmlFor={name} className="h6">{label} {required ? <AiFillStar style={{color: "red", width : "8px"}} /> : null}</label>
//                     </div>
//                     <div className="form-control">
//                         <Field className="form-control"  name={name} >
//                             { 
//                                 ({field, form}) => {
//                                     const { setFieldValue } = form;
//                                     const  { value } = field;
//                                     return <DatePicker  readOnly={disabled} className = " border border-white" id={name}  {...field} 
//                                                         selected={value} 
//                                                         onChange={value => setFieldValue(name, value)}
//                                                         placeholderText = "Select Date"
//                                                         renderCustomHeader={({
//                                                             date,
//                                                             changeYear,
//                                                             changeMonth,
//                                                             decreaseMonth,
//                                                             increaseMonth,
//                                                             prevMonthButtonDisabled,
//                                                             nextMonthButtonDisabled,
//                                                           }) => (
//                                                             <div
//                                                               style={{
//                                                                 margin: 10,
//                                                                 display: "flex",
//                                                                 justifyContent: "center",
//                                                               }}
//                                                             >
//                                                               <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
//                                                                 {"<"}
//                                                               </button>
//                                                               <select
//                                                                 value={date.getFullYear()}
//                                                                 onChange={({ target: { value } }) => changeYear(value)}
//                                                               >
//                                                                 {years.map((option) => (
//                                                                   <option key={option} value={option}>
//                                                                     {option}
//                                                                   </option>
//                                                                 ))}
//                                                               </select>

//                                                               <select
//                                                                 value={months[date.getMonth()]}
//                                                                 onChange={({ target: { value } }) =>
//                                                                   changeMonth(months.indexOf(value))
//                                                                 }
//                                                               >
//                                                                 {months.map((option) => (
//                                                                   <option key={option} value={option}>
//                                                                     {option}
//                                                                   </option>
//                                                                 ))}
//                                                               </select>

//                                                               <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
//                                                                 {">"}
//                                                               </button>
//                                                             </div>
//                                                           )}/>
//                                 }
//                             }
//                         </Field>
//                     </div>
//                         <ErrorMessage  name = {name}  render={ message =><p className="text-danger text-center">{message}</p>}/>
//                 </div>
// }