const comapreDate = (data)=>{
// Given date
const givenDate = new Date(data.date);

// Current date
const currentDate = new Date();

// Calculate the difference in time
const timeDifference = currentDate - givenDate;

// Convert time difference to days
const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

// Check if the given date is older than 30 days
if (dayDifference <= 30) {
    return data
} else {
    return null
}
}
export default comapreDate