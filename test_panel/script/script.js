let emailRegExp = /^[\w_\-\.]+@\w+\.\w+$/;
let userRegexp = /^[аАбБвВгГдДеЕжЖзЗиИіІїЇйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩьЬєЄюЮяЯ]+\s+[аАбБвВгГдДеЕжЖзЗиИіІїЇйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩьЬєЄюЮяЯ]+$/;
let test = {};
let count = 1;
let time = 0;
let timeQuestion = 0;
let answerTestObj = [];
let result = {};
let m=0;

//Функція старт
function start() {
    let obj = {};
    let arrNameUser = [];
    arrNameUser = document.querySelectorAll('.mainLoginBox__input')[0].value.split(' ');
    obj["first_name"] = arrNameUser[0];
    obj["email"] = document.querySelectorAll('.mainLoginBox__input')[1].value;
    obj["last_name"] = arrNameUser[1];
    request(obj);
};
//Функція перевірки заповнення даних тестуючим
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
    };
    if (document.getElementById('permission').checked) {
        document.querySelector('.mainLoginBoxPermissionError').style.display = 'none';
    } else {
        document.querySelector('.mainLoginBoxPermissionError').style.display = 'block';
    };
    if ((testEmail) && (testName) && (document.getElementById('permission').checked)) {
        document.querySelector('.mainLogin__button').disabled = true;
        start();
    };
};
// Функція ініціалізації привязка евентів до кнопок
function init() {
    getInfoTest();
    document.querySelector('.mainLogin__button').addEventListener('click', checkInfoUser);
    document.querySelector('.modalWindowMessageBox__button').addEventListener('click',()=>{
        document.querySelector('.modalWindow').style.display = 'none';
    })
    document.querySelector('.next').addEventListener('click', () => {
        if (document.querySelector('.back').style.display = 'none') {
            document.querySelector('.back').style.display = 'block';
        };
        rememberAnswer(test[count]);
        test[count]['answer_time'] = Math.trunc((Date.now() - timeQuestion) / 1000);
        count++;
        if (count === test.length - 1) {
            document.querySelector('.next').style.display = 'none';
        };
        render(test[count]);
    });
    document.querySelector('.back').addEventListener('click', () => {
        if (document.querySelector('.next').style.display = 'none') {
            document.querySelector('.next').style.display = 'block';
        };
        rememberAnswer(test[count]);
        count--;
        if (count === 1) {
            document.querySelector('.back').style.display = 'none';
        };
        render(test[count]);
    });
    document.querySelector('.end').addEventListener('click', showResult);
};
//функція запит на отримання тестів і відправка інформації про тестуючого
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
        if (test.user_id === -1) {
            document.querySelector('.modalWindow').style.display = 'block';
            document.querySelector('.mainLogin__button').disabled = false;
        } else {
            document.querySelector('.mainInfo').style.display = 'none';
            document.querySelector('.mainTestBox').style.display = 'block';
            time = parseInt(m) * 60;
            render(test[1]);
            clock = setInterval(timer, 1000);
        }

    } catch (error) {
        console.log(error);
    };
};
//Функція рендеру часу для нормального відображення
checkTime = (t) => {
    if (t < 10) { return '0' + t }
    else
        return t;
};
//Функція таймер
function timer() {
    time--;
    let minute = checkTime(Math.trunc(time / 60));
    let second = checkTime(time % 60);
    document.querySelector('.mainHeader__timer').textContent = 'Час:' + minute + ':' + second;
    if (time == 0) {
        showResult();
    }

};
//Функція показу і навігації по питаннях тесту
function render(obj) {
    if (obj.question_image === null) {
        document.querySelector('.mainTestBoxQuestion__img').style.display = 'none';
    } else {
        document.querySelector('.mainTestBoxQuestion__img').style.display = 'block';
        document.querySelector('.mainTestBoxQuestion__img').setAttribute('src', obj.question_image);
    };
    document.querySelector('.mainTestBoxQuestion__text').textContent = test[count].question_text;
    document.querySelector('.mainHeader__askCount').textContent=`Кількість питань:${count}/${test.length-1}`
    switch (obj.question_type) {
        case 1:
            document.querySelector('.mainTestBoxAnswer').innerHTML = '<div><p>Введіть відповідь</p><textarea class="answer__textArea"></textarea></div>';
            if ('answer' in obj) {
                document.querySelector('.answer__textArea').value = obj['answer'];
            };
            break;
        case 2:
            document.querySelector('.mainTestBoxAnswer').innerHTML = '';
            for (const key in obj.answer_variants) {
                document.querySelector('.mainTestBoxAnswer').innerHTML += `<div class="mainTestBoxAnswerBox"><input type="radio" name="radio" id="" class="mainTestBoxAnswerBox__input"><span class="mainTestBoxAnswerBox__span">${test[count].answer_variants[key]}</span></div>`
            };
            if ('answer' in obj) {
                for (let i = 0; i < document.querySelectorAll('.mainTestBoxAnswerBox__span').length; i++) {
                    if (document.querySelectorAll('.mainTestBoxAnswerBox__span')[i].textContent === obj['answer']) {
                        document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].checked = true;
                    };
                };
            };
            break;
        case 3:
            document.querySelector('.mainTestBoxAnswer').innerHTML = '';
            for (const key in obj.answer_variants) {
                document.querySelector('.mainTestBoxAnswer').innerHTML += `<div class="mainTestBoxAnswerBox"><input type="checkbox" name="" id="" class="mainTestBoxAnswerBox__input"><span class="mainTestBoxAnswerBox__span">${test[count].answer_variants[key]}</span></div>`
            };
            if ('answer' in obj) {
                for (let i = 0; i < document.querySelectorAll('.mainTestBoxAnswerBox__span').length; i++) {
                    for (key in obj['answer']) {
                        if (document.querySelectorAll('.mainTestBoxAnswerBox__span')[i].textContent === obj['answer'][key]) {
                            document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].checked = true;
                        };
                    };
                };
            };
            break;
        case 4:

            break;

        default:
            break;
    };
    timeQuestion = Date.now();
};
//Функці запису відповіді.
function rememberAnswer(obj) {
    switch (obj.question_type) {
        case 1:
            obj['answer'] = document.querySelector('.answer__textArea').value;
            break;
        case 2:
            for (let i = 0; i < document.querySelectorAll('.mainTestBoxAnswerBox__input').length; i++) {
                if (document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].checked) {
                    obj['answer'] = document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].nextElementSibling.textContent;
                };
            };
            break;
        case 3:
            obj['answer'] = {};
            for (let i = 0; i < document.querySelectorAll('.mainTestBoxAnswerBox__input').length; i++) {
                if (document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].checked) {
                    obj['answer'][`correct_answer${i + 1}`] = document.querySelectorAll('.mainTestBoxAnswerBox__input')[i].nextElementSibling.textContent;
                };
            };
            break;
        case 4:

            break;

        default:
            break;
    };
};
//Функція провірки чи є відповідь уже в обєкті
function showResult() {
    clearInterval(clock);
    rememberAnswer(test[test.length - 1]);
    test[test.length - 1]['answer_time'] = Math.trunc((Date.now() - timeQuestion) / 1000);
    remakeObj();
    document.querySelector('.mainTestBox').style.display = 'none';
    document.querySelector('.mainEndTest').style.display = 'block';
    sendResult();
    console.log(answerTestObj);
};
//Функція відправки результату
async function sendResult() {
    try {
        const response = await fetch('https://alexdko.pythonanywhere.com/answer/ ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: answerTestObj
        });
        console.log(response);
        result = await response.json();
        console.log(result);
        document.querySelector('.userId').textContent += result.user_id;
        document.querySelector('.points').textContent += result.points;
        document.querySelector('.percent').textContent += result.percent;
    } catch (error) {
        console.log(error);
    };
};
//Функція підготовки обєкту до відправки
function remakeObj() {
    for (let i = 1; i < test.length; i++) {
        let obj = {};
        obj['user_id'] = test[0].user_id;
        obj['question_id'] = test[i].id;
        if (test[i].answer === undefined) {
            obj['answer'] = "";
        } else {
            obj['answer'] = test[i].answer;
        };
        if (test[i].answer_time === undefined) {
            obj['answer_time'] = 0;
        } else {
            obj['answer_time'] = test[i].answer_time;
        };
        answerTestObj.push(obj);
    };
    answerTestObj = JSON.stringify(answerTestObj);
};
//Функція отримання даних про тест.
async function getInfoTest(){
    try {
        const response = await fetch('https://alexdko.pythonanywhere.com/testing/');
        const infotest = await response.json();
        m=infotest.time_for_test;
        document.querySelector('.mainHeader__timer').textContent = 'Час:' + m + ':00';
        document.querySelector('.mainInfoCountQuestion').textContent='Кількість питань:'+infotest.questions_count;
        document.querySelector('.mainInfoDescription__text').textContent=infotest.test_description;
    } catch (error) {
        console.log(error);
    };
}
//початок роботи
init();