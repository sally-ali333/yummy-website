export class Contact {
    constructor() {
        $('#nameInput').keyup(() => {
            this.nameValidation()
        })
        $('#emailInput').keyup(() => {
            this.emailValidation()
        })
        $('#phoneInput').keyup(() => {
            this.phoneValidation()
        })
        $('#ageInput').keyup(() => {
            this.ageValidation()
        })
        $('#passwordInput').keyup(() => {
            this.passworValidation()
        })
        $('#repasswordInput').keyup(() => {
            this.repasswordValidation()
        })

    }

    nameValidation() {
        var regex = /^[a-zA-Z ]+$/;
        if (regex.test($("#nameInput").val()) == true) {
            $("#nameAlert").css("display", "none")
            return true; //valid
        } else {
            $("#nameAlert").css("display", "block")
            return false; //invalid
        }
    }

    emailValidation() {
        var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test($("#emailInput").val()) == true) {
            $("#emailAlert").css("display", "none")
            return true; //valid
        } else {
            $("#emailAlert").css("display", "block")
            return false; //invalid
        }
    }

    phoneValidation() {
        var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (regex.test($("#phoneInput").val()) == true) {
            $("#phoneAlert").css("display", "none")
            return true; //valid
        } else {
            $("#phoneAlert").css("display", "block")
            return false; //invalid
        }
    }


    ageValidation() {
        var regex = /^0*(?:[1-9][0-9]?|100)$/;
        if (regex.test($("#ageInput").val()) == true) {
            $("#ageAlert").css("display", "none")
            return true; //valid
        } else {
            $("#ageAlert").css("display", "block")
            return false; //invalid
        }
    }

    passworValidation() {
        var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        if (regex.test($("#passwordInput").val()) == true) {
            $("#passwordAlert").css("display", "none")
            return true; //valid
        } else {
            $("#passwordAlert").css("display", "block")
            return false; //invalid
        }
    }

    repasswordValidation() {
        if ($("#repasswordInput").val() == $("#passwordInput").val() && this.passworValidation()) {
            $("#repasswordAlert").css("display", "none")
            return true; //valid
        } else {
            $("#repasswordAlert").css("display", "block")
            return false; //invalid
        }
    }

    Validation() {
        if (this.nameValidation() && this.emailValidation() && this.phoneValidation() &&
            this.ageValidation() && this.passworValidation() && this.repasswordValidation()) {
            $("#submitBtn").removeAttr("disabled")
        } else {
            $("#submitBtn").attr("disabled", true)
        }
    }

}