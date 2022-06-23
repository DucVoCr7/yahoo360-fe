export const handleErrorSettings = (userInfo)=> {
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(userInfo.email?.trim()) {
        if(!regex.test(userInfo.email)) {
            errors.email = 'Enter a valid email'
          }
    }
    if(userInfo.password?.trim()) {
        if(userInfo.password.length < 6) {
            errors.password = 'Enter at least 6 characters'
          }
    }
    if(userInfo.phone) {
        console.log()
        if(userInfo.phone.toString().length < 10) {
            errors.phone = 'Enter at least 10 numbers'
          }
    }
    return errors
  }