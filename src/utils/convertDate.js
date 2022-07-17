const convertDate = (timeStamp, typeFull = true)=> {
    let dateObj = new Date(timeStamp);
    // let month = dateObj.getMonth() + 1; // Muốn thể hiện số thì dùng + 1
    let month = dateObj.getMonth(); // Muốn thể hiện text thì mở switch case
    let year = dateObj.getFullYear();
    let date = dateObj.getDate();
    // let day = dateObj.getDay()
    let hours = dateObj.getHours();
    hours = ("0" + hours).slice(-2);
    let minutes = dateObj.getMinutes();
    minutes = ("0" + minutes).slice(-2);
    switch(month) {
        case 0:
            month = 'January'
            break
        case 1:
            month = 'February'
            break
        case 2:
            month = 'March'
            break
        case 3:
            month = 'April'
            break    
        case 4:
            month = 'May'
            break
        case 5:
            month = 'June'
            break    
        case 6:
            month = 'July'
            break
        case 7:
            month = 'August'
            break    
        case 8:
            month = 'September'
            break
        case 9:
            month = 'October'
            break    
        case 10:
            month = 'November'
            break
        default:
            month = 'December'   
    }
    // switch(day) {
    //     case 0:
    //         day = 'Sunday'
    //         break
    //     case 1:
    //         day = 'Monday'
    //         break
    //     case 2:
    //         day = 'Tuesday'
    //         break
    //     case 3:
    //         day = 'Wednesday'
    //         break    
    //     case 4:
    //         day = 'Thursday'
    //         break
    //     case 5:
    //         day = 'Friday'
    //         break    
    //     default:
    //         day = 'Saturday'
        
    // }
    if(typeFull) {
        return `${hours}:${minutes} ${month} ${date}, ${year}`;
    } else {
        return `${hours}:${minutes} ${month} ${date}`;
    }
}
export default convertDate