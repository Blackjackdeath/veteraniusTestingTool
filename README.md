# veteraniusTestingTool
Модель обєкта, тепер вже динамічна. До неї ще додаться малюнки але поки що читаю як це організувати
modelObj={
    qestion:'',
    type:'',
    answers:[]
};
Тіло запиту. яке повинен опрацювати сервер. В реалі який шлях опишете такий і запишу це не проблема. В чорновому варіанті закоментований щоб працювало потрібно 
розкоментувати в скрипту. Можливі різні баги такщо відразу тегайте мене. 
const response=await fetch('https://server/api/test', {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(modelObj)
    //         });
Пароль: Admin
password: 1