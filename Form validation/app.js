// class FormValidation

class FormValidation{
    formValues={
        fullname : "",
        email : "",
        phonenumber : "",
        password : "",
        confirmpassword :""
    }
    errorValues = {
        fullnameErr : "",
        emailErr : "",
        phonenumberErr : "",
        passwordErr : "",
        confirmpasswordErr : ""
    }

    //showErrorMessage function
    showErrorMessage(index, msg){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('span')[0].textContent = msg   

    }

    //showSuccessMessage function
    showSuccessMessage(index){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')

    }

    //getInputs function
    getInputs(){
        this.formValues.fullname=document.getElementById('fullname').value.trim()
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.phonenumber = document.getElementById('phonenumber').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
       this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim()
    }

    //validateFullname function
    validateFullname(){
        if(this.formValues.fullname===""){
            this.errorValues.fullnameErr="* Please Enter Your Name"
            this.showErrorMessage(0,this.errorValues.fullnameErr)
        }
        else if(this.formValues.fullname.length<5){
            this.errorValues.fullnameErr="*Full name must be atleast 5 characters"
            this.showErrorMessage(0,this.errorValues.fullnameErr)
        }
        else if(this.formValues.fullname.length>15){
            this.errorValues.fullnameErr="*Full name should not exceed 15 characters"
            this.showErrorMessage(0,this.errorValues.fullnameErr)
        }
        else{
            this.errorValues.fullnameErr= ""
            this.showSuccessMessage(0)
        }
    }
    
    //validateEmail function
    validateEmail(){
        const regExp=/^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.a-zA-Z{2,10})?$/
        if(this.formValues.email===""){
            this.errorValues.emailErr=" *Please Enter Your Email"
            this.showErrorMessage(1,this.errorValues.emailErr)
        }
        else if(!(regExp.test(this.formValues.email))){
            this.errorValues.emailErr="*Please Enter The Vaild Email"
            this.showErrorMessage(1,this.errorValues.emailErr)
        }
        else{
            this.errorValues.emailErr = ""
            this.showSuccessMessage(1)
        }

    }

    //validatePhonenumber function
    validatePhonenumber(){
        const phonenumber=/^\d{10}$/
        if(this.formValues.phonenumber === ""){
            this.errorValues.phonenumberErr="* Please Enter Your Phone Number"
            this.showErrorMessage(2,this.errorValues.phonenumberErr)
        } 
        else if(phonenumber.test(this.formValues.phonenumber)){
            this.errorValues.phonenumberErr=""
            this.showSuccessMessage(2)
        }
        else if(this.formValues.phonenumber==="123456789"){
            this.errorValues.phonenumberErr="* Invalid Phone Number"
            this.showErrorMessage(2, this.errorValues.phonenumberErr)
        }

        else{
            this.errorValues.phonenumberErr="* Invalid Phone Number"
            this.showErrorMessage(2,this.errorValues.phonenumberErr)
        }

    }

    //validatePassword function
    validatePassword(){
        const regExp=/^([a-zA-Z0-9-_\.]+)$/ 
        if(this.formValues.password===""){
            this.errorValues.passwordErr="* Please provoide the password"
            this.showErrorMessage(3, this.errorValues.passwordErr)
        }
        else if(this.formValues.password.length<8){
            this.errorValues.passwordErr="* Password must be atleast 8 characters"
            this.showErrorMessage(3, this.errorValues.passwordErr)
        }
        else if(this.formValues.password==="password"){
            this.errorValues.passwordErr="* Password is not valid"
            this.showErrorMessage(3, this.errorValues.passwordErr)
        }
        else if(this.formValues.password===this.formValues.fullname){
            this.errorValues.passwordErr="* Password should not be your name"
            this.showErrorMessage(3, this.errorValues.passwordErr)
        }
        
        else if((regExp.test(this.formValues.password))){
            this.errorValues.passwordErr="*Password is not strong"
            this.showErrorMessage(3,this.errorValues.passwordErr)
        }
        else{
            this.errorValues.passwordErr=""
            this.showSuccessMessage(3)
        }

    }

    // validateConfirmPassword function
    validateConfirmPassword(){
        if(this.formValues.confirmpassword=== ""){
            this.errorValues.confirmpasswordErr="* Invalid confirm password"
            this.showErrorMessage(4, this.errorValues.confirmpasswordErr)
        }
        else if(this.formValues.confirmpassword===this.formValues.password  && this.errorValues.passwordErr ===""){
            this.errorValues.confirmpasswordErr = ""
            this.showSuccessMessage(4)
        }
        else{
            this.errorValues.confirmpasswordErr="* Password and confirm password must be same"
            this.showErrorMessage(4, this.errorValues.confirmpasswordErr)
        }

    }

    //alertMessage function
    alertMessage(){
        const {fullnameErr, emailErr, phonenumberErr, passwordErr, confirmpasswordErr}= this.errorValues
        if(fullnameErr==="" && emailErr==="" && phonenumberErr==="" && passwordErr==="" && confirmpasswordErr===""){
            swal("Registration Sucessful","Thankyou ,"+this.formValues.fullname, "success").then(()=>{
                console.log(this.formValues)
                this.removeInputs()
            })
        }
        else{
            swal("Give Valid Inputs", "Click ok to continue", "error")
        }

    }
    
    //removeInputs function
    removeInputs(){
        const form_group=document.getElementsByClassName('form-group')
        Array.from(form_group).forEach(element=>{
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent =""
            element.classList.remove('success')
        })

    }

}
const ValidateUserInputs=new FormValidation()

document.getElementsByClassName('form')[0].addEventListener('submit', event=>{      //by using arrow function
    event.preventDefault()
    ValidateUserInputs.getInputs()                  
    ValidateUserInputs.validateFullname()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePhonenumber()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateConfirmPassword()
    ValidateUserInputs.alertMessage()

})