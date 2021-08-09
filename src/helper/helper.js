
export const net = (amount, perc) => {
  return Number(
    (Number(amount) - (Number(amount) * perc / 100)).toFixed(0)
  );
}

export const DateFunction = (date) => {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  // const today =  yyyy + "-" + mm + '-' + dd;
  const today = dd + '-' + mm + '-' + yyyy;
  return today;
}


export const NewSearchHandler = (inputValue, data) => {
  let result = [];
  if (inputValue && data) {
      result = data.filter(
        (element) =>(
              element.first_name && element?.first_name.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.last_name && element?.last_name.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.mobile && element?.mobile.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.aadhar_number && element?.aadhar_number.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.pan_number && element?.pan_number.toString().toLowerCase().includes(inputValue.toLowerCase())
            )
      )
  } else {
    result = data;
  }
  return result;
}

export const PendingSearchHandler = (inputValue, data) => {
  let result = [];
  if (inputValue && data) {
      result = data.filter(
        (element) =>(
              element.customer_name && element?.customer_name.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.customer_pan && element?.customer_pan.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.customer_aadhar && element?.customer_aadhar.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.customer_mobile && element?.customer_mobile.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
              element.id && element?.id.toString().toLowerCase().includes(inputValue.toLowerCase())
            )
      )
  } else {
    result = data;
  }
  return result;
}

