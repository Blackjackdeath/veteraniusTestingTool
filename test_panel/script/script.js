let emailRegExp = /^[\w_\-\.]+@\w+\.\w+$/;

function statr() {
    alert('Start');
    let obj={};
    obj["name"]=document.querySelectorAll('.mainLoginBox__input')[0].value;
    obj["email"]=document.querySelectorAll('.mainLoginBox__input')[1].value;
    console.log(obj);
};

function checkInfoUser() {
    let test = emailRegExp.test(document.querySelectorAll('.mainLoginBox__input')[1].value);
    if (test) {
        document.querySelector('.mainLoginBoxEmailError').style.display='none';
    }else{
        document.querySelector('.mainLoginBoxEmailError').style.display='block';
    };
    if (document.querySelectorAll('.mainLoginBox__input')[0].value!==''){
        document.querySelector('.mainLoginBoxLoginError').style.display='none';
    }else{
        document.querySelector('.mainLoginBoxLoginError').style.display='block';
    }
    if ((test)&&(document.querySelectorAll('.mainLoginBox__input')[0].value!=='')) {
        statr(); 
    } ;
};

function init() {
    document.querySelector('.mainLogin__button').addEventListener('click', checkInfoUser);

};

init();