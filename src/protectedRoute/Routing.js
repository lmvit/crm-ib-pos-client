import React from 'react'
import {Route} from 'react-router-dom';

const Routing = (props)=> {
    const token = sessionStorage.getItem('token');
    if(token){
        return <Route {...props}/>
    }else{
        return props.logout();
    }
}

export default Routing
