let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let email = document.getElementById("email")
let password = document.getElementById("password")
let submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Please fill all data")
    }else{
        localStorage.setItem("userInfo" , JSON.stringify(
            {
                firstName : firstName.value,
                lastName : lastName.value,
                email : email.value,
                password : password.value
            }
        ))
        setTimeout(() => window.location = "login.html", 1000)
    }
})
