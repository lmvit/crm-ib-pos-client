/*eslint-disable*/
import {Field, ErrorMessage } from 'formik';
import { AiFillStar } from 'react-icons/ai';

export const DefaultInput = (props) => {
  const { name, label, required, type,classes,...rest} = props;
  return <div className={classes} style={{height:'100px'}}>
    <div className="p-1">
      <label htmlFor={name} className="h6">{label} 
        {required ? <sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup> : null}
      </label>
    </div>
    <div>
      <Field type={type} {...rest} name={name} placeholder={label} autoComplete="off" />
      <ErrorMessage name={name} render={message => <span className="text-danger">{message}</span>} />
    </div>
  </div>
}

export const Select = (props)=>{
  const {name,label,required,options,classes,...rest}= props;
  return <div className={classes} style={{height:'100px'}}>
    <div className="p-1">
      <label htmlFor={name} className="h6">{label} {required ? <sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup> : null}</label>
    </div>
    <div>
        <Field as="select" name={name} {...rest}>
          <option value="">Select</option>
          {options.map((element,index)=>{
            return (
              <option key={index} className="text-capitalize" value={element.toLocaleLowerCase()}>{element}</option>
            )
          })}
        </Field>
        <ErrorMessage name={name} render={message => <span className="text-danger">{message}</span>} />
    </div>
  </div>
}

export const PermanentInput = (props) => {
  const { name, label, required, type,classes,...rest} = props;
  // console.log(props)
  return <div className={classes} style={{height:'100px'}}>
    <div className="p-1">
      <label htmlFor={name} className="h6">{label} 
        {required ? <sup><AiFillStar style={{ color: "red", width: "8px" }}/></sup> : null}
      </label>
    </div>
    <div>
      <Field type={type} name={name} placeholder={label} autoComplete="off" {...rest}/>
      <ErrorMessage name={name} render={message => <span className="text-danger">{message}</span>} />
    </div>
  </div>
}


