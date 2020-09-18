
//this will check  values in the jason file with akey - value paire and check if the value is empty
// this funtion will return treu/false

const isEmpty = (value ) => 
value === undefined ||
value == null ||
(typeof value === 'object' && Object.keys(value).length === 0 )||
(typeof value === 'string'  && value.trim().length===0);

export default isEmpty;
