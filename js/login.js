let email = document.getElementById("email")
let password = document.getElementById("password")
let submitBtn = document.getElementById("submitBtn")
let userInfo = JSON.parse(localStorage.getItem("userInfo"))

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(userInfo){    
        if (email.value === "" || password.value === "") {
            alert("Please fill all data")
        } else {
            if (userInfo.email && userInfo.email.trim() == email.value && email.value.trim() && 
            userInfo.password && userInfo.password.trim() == password.value && password.value.trim()) {
                setTimeout(() => window.location = "../index.html", 1000)
            } else {
                alert("Email or Password is wrong")
            }
        }}else {
            alert("You don't have an account")
            setTimeout(() => window.location = "register.html", 1000)
        }
});