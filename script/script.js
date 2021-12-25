let modelObj={
    qestion:'',
    answers:[{
        answer:'',
        right:false
    },{
        answer:'',
        right:false
    },{
        answer:'',
        right:false
    },{
        answer:'',
        right:false
    }]
};

function send(){
    modelObj.qestion=document.getElementsByTagName('textarea')[0].value;
    modelObj.answers[0].answer=document.getElementById('answer1').value;
    modelObj.answers[0].right=document.getElementById('answer1').nextElementSibling.nextElementSibling.checked;
    modelObj.answers[1].answer=document.getElementById('answer2').value;
    modelObj.answers[1].right=document.getElementById('answer2').nextElementSibling.nextElementSibling.checked;
    modelObj.answers[2].answer=document.getElementById('answer3').value;
    modelObj.answers[2].right=document.getElementById('answer3').nextElementSibling.nextElementSibling.checked;
    modelObj.answers[3].answer=document.getElementById('answer4').value;
    modelObj.answers[3].right=document.getElementById('answer4').nextElementSibling.nextElementSibling.checked;
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
}