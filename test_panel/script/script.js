let emailRegExp = /^[\w_\-\.]+@\w+\.\w+$/;
let userRegexp = /^[\w]+\s+[\w]+$/;
let test = {};
let count = 1;
function start() {
    let obj = {};
    let arrNameUser = [];
    arrNameUser = document.querySelectorAll('.mainLoginBox__input')[0].value.split(' ');
    obj["first_name"] = arrNameUser[0];
    obj["email"] = document.querySelectorAll('.mainLoginBox__input')[1].value;
    obj["last_name"] = arrNameUser[1];
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
        start();
    };
};

function init() {
    document.querySelector('.mainLogin__button').addEventListener('click', checkInfoUser);
    document.querySelector('.next').addEventListener('click', () => {
        count++;
        if (count === test.length) {
            document.querySelector('.next').disabled = true;
        }
        render(count, test);
    });
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
        test = await response.json();
        console.log(test);
        document.querySelector('.mainInfo').style.display = 'none';
        document.querySelector('.mainTestBox').style.display = 'block';
        render(1, test);
    } catch (error) {
        console.log(error);
    };
};

function timer() {
    //Work;
};

function render(count, test) {
    if (test[count].question_image === null) {
        document.querySelector('.mainTestBoxQuestion__img').style.display = 'none';
    } else {
        document.querySelector('.mainTestBoxQuestion__img').style.display = 'block';
        console.log(test[count].question_image);
    };
    document.querySelector('.mainTestBoxQuestion__text').textContent = test[count].question_text;
    switch (test[count].question_type) {
        case 1:
            document.querySelector('.mainTestBoxAnswer').innerHTML = '<div><p>Введіть відповідь</p><textarea class="answer__textArea"></textarea></div>'
            break;
        case 2:
            document.querySelector('.mainTestBoxAnswer').innerHTML='';
            for (const key in test[count].answer_variants) {
                document.querySelector('.mainTestBoxAnswer').innerHTML+=`<div class="mainTestBoxAnswerBox"><input type="radio" name="radio" id="" class="mainTestBoxAnswerBox__input"><span class="mainTestBoxAnswerBox__span">${test[count].answer_variants[key]}</span></div>`
            };
            break;
        case 3:

            break;
        case 4:

            break;

        default:
            break;
    }
};

init();