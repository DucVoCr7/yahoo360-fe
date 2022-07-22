export const handleErrorUpdateUser = (infoUpdate)=> {
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    Object.keys(infoUpdate).forEach(key => {
        if(key !== 'image') {
            if(!infoUpdate[key].trim()) {
                delete infoUpdate[key]
            }
        }
    })
    if(infoUpdate.email) {
        if(!regex.test(infoUpdate.email)) {
            errors.email = 'Enter a valid email'
          }
    }
    if(infoUpdate.phoneNumber) {
        if(infoUpdate.phoneNumber.toString().length < 10) {
            errors.phoneNumber = 'Enter at least 10 numbers'
          }
    }
    return [infoUpdate, errors]
  }