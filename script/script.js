let modelObj={
    qestion:'',
    type:'',
    answers:[]
};

function answerArray(selector){
    let arr=[];
    let obj={
        answer:'',
        right:false
    };
    for(let i=0; i<document.querySelectorAll(selector).length;i++){
       obj.answer=document.querySelectorAll(selector)[i].value;
       console.log(document.querySelectorAll(selector)[i].nextElementSibling);
       obj.right=document.querySelectorAll(selector)[i].nextElementSibling.checked;
       arr.push(Object.assign({},obj))
    };
    return arr;
};

function send(){
    modelObj.qestion=document.getElementsByTagName('textarea')[0].value;
    let i=0;
    while (true) {
        if (document.querySelectorAll('.adminBoxTypeAnswerBoxAnswer__input')[i].checked){
            modelObj.type=document.querySelectorAll('.adminBoxTypeAnswerBoxAnswer__input')[i].value;
            break;
        }
        else{
            i++;
        };    
    };
    switch (modelObj.type) {
        case 'one':
            modelObj.answers=answerArray('.oneChooseAnswer__text');
            break;
        case 'many':
            modelObj.answers=answerArray('.manyChooseAnswer__text');
            break;
        case 'freedom':
            modelObj.answers.push(undefined);
            break;
        case 'missword':
            modelObj.answers=answerArray('.oneChooseAnswer__text');
            break;
        default:
            break;
    };
    console.log(modelObj);
    // async function sendPost(){
    //     try {
    //         const response=await fetch('https://server/api/test', {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(modelObj)
    //         });
    //         const data = await response;
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
};

function login(){
    if ((document.getElementById('password').value==='1')&&(document.getElementById('login').value==='Admin')){
        document.querySelector('.modalWindow').style.display="none";
    }
    else{
        alert('Error');
    }
};

function choose(event){
    if (event.target.tagName==="INPUT"){
        switch (event.target.value) {
            case 'one':
                document.querySelector('.oneChoose__description').textContent='Введіть варіанти відповідів і виберіть одну правильнух';
                document.querySelector('.oneChoose').style.display="block";
                document.querySelector('.manyChoose').style.display="none";
                break;
            case 'many':
                document.querySelector('.oneChoose').style.display="none";
                document.querySelector('.manyChoose').style.display="block";
                break;
            case 'freedom':
                document.querySelector('.oneChoose').style.display="none";
                document.querySelector('.manyChoose').style.display="none";
                break;
            case 'missword':
                document.querySelector('.oneChoose__description').textContent='Введіть варіанти відповідів і виберіть одну правильну. В тексті питання поставте {var} де повинен бути пропуск (не забувайте за пробіли)';
                document.querySelector('.oneChoose').style.display="block";
                document.querySelector('.manyChoose').style.display="none";
                break;
            default:
                break;
        }
    }
}

function init(){
    document.querySelector('.accept').addEventListener('click', login);
    document.querySelector('.adminBoxTypeAnswerBox').addEventListener('click', ()=>choose(event));
};
init();