//console.log(module);
exports.getDate = function (){ //anonymous function
let options =
{  weekday: 'long',
 year: 'numeric',
 month: 'long',
 day: 'numeric' };
let today = new Date().toLocaleDateString("en-US",options);
console.log(new Date().toLocaleString("hi-IN",options));
return today;
};

//alternate way i.e. named function
module.exports.getDay = getDay;
function getDay(){
let options =
{  weekday: 'long'};
let today = new Date().toLocaleDateString("en-US",options);
console.log(new Date().toLocaleString("hi-IN",options));
return today;
};

// var weekday = new Array(7);
// weekday[0] = "Sunday";
// weekday[1] = "Monday";
// weekday[2] = "Tuesday";
// weekday[3] = "Wednesday";
// weekday[4] = "Thursday";
// weekday[5] = "Friday";
// weekday[6] = "Saturday";
// console.log(weekday[today.getDay()]);
// var cur = today.getDay();
// if (cur === 0 || cur === 6)
// {
//   console.log("Hello boss today is " +weekday[today.getDay()]+" i.e. weekend");
// }
// else
// {
//   console.log("Hello boss today is "+weekday[today.getDay()]+" i.e working day");
// }
//console.log(list.length);
