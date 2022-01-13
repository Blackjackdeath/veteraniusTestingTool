let emailRegExp = /^[\w_\-\.]+@\w+\.\w+$/;
let userRegexp = /^[\w]+\s+[\w]+$/;
function statr() {
    let obj = {};
    obj["first_name"] = document.querySelectorAll('.mainLoginBox__input')[0].value;
    obj["email"] = document.querySelectorAll('.mainLoginBox__input')[1].value;
    obj["last_name"] = "Hapak";
    console.log(obj);
    request(obj);
};

function checkInfoUser() {
    let testEmail = emailRegExp.test(document.querySelectorAll('.mainLoginBox__input')[1].value);
    let testName = userRegexp.test(document.querySelectorAll('.mainLoginBox__input')[0].value)
    if (testEmail) {
        document.querySelector('.mainLoginBoxEmailError').style.display = 'none';
    } else {
        document.querySelector('.mainLoginBoxEmailError').style.display = 'block';
    };
    if (testName) {
        document.querySelector('.mainLoginBoxLoginError').style.display = 'none';
    } else {
        document.querySelector('.mainLoginBoxLoginError').style.display = 'block';
    }
    if ((testEmail) && (testName)) {
        statr();
    };
};

function init() {
    document.querySelector('.mainLogin__button').addEventListener('click', checkInfoUser);
};

async function request(user) {
    try {
        const response = await fetch('https://alexdko.pythonanywhere.com/testing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const request = await response.json();
        console.log(request);
        document.querySelector('.mainInfo').style.display='none';
        document.querySelector('.mainTestBox').style.display='block';

    } catch (error) {
         console.log(error);
    }
}
init();