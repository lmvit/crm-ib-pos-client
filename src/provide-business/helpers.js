export const PresentCustomerAddress = ()=>{
    return(
        [
            { type: "text", name: "present_address1", label: "Address1", required: true },
            { type: "text", name: "present_address2", label: "Address2", required: false },
            { type: "text", name: "present_country", label: "Country", required: true },
            { type: "text", name: "present_states", label: "State", required: true },
            { type: "text", name: "present_city", label: "City", required: true },
            { type: "text", name: "present_district", label: "District", required: true },
            { type: "number", name: "present_pincode", label: "Pincode", required: true }
        ]
    )
}

export const PermanentCustomerAddress = ()=>{
    return(
        [
            { type: "text", name: "permanent_address1", presentName : "present_address1", label: "Address1", required: true },
            { type: "text", name: "permanent_address2",presentName : "present_address2", label: "Address2", required: false },
            { type: "text", name: "permanent_country",presentName : "present_country", label: "Country", required: true },
            { type: "text", name: "permanent_states",presentName : "present_states", label: "State", required: true },
            { type: "text", name: "permanent_city",presentName : "present_city", label: "City", required: true },
            { type: "text", name: "permanent_district",presentName : "present_district", label: "District", required: true },
            { type: "number", name: "permanent_pincode",presentName : "present_pincode", label: "Pincode", required: true }
        ]
    )
}

export const CustomerDetails = ()=>{
    return(
        [
            { type: "text", name: "first_name", label: "First Name" },
            { type: "text", name: "last_name", label: "Last Name" },
            { type: "date", name: "dob", label: "Date Of Birth" },
            { type: "number", name: "mobile_number", label: "Mobile Number" },
            { type: "email", name: "email", label: "Email" },
        ]
    )
}

export const CustomerIdentity = ()=>{
    return(
        [
            { type: "text", name: "pancard", label: "Pancard" },
            { type: "number", name: "aadhar_number", label: "Aadhar Number" },
        ]
    )
}