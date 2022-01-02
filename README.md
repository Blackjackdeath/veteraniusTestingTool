# veteraniusTestingTool
Модель обєкта, вона статична в реалі потрібно щоб сервер міг опрацьовувати динамічну та відштовхуйтеся від ціє просто робіть провірку на довжину масиву.
modelObj={
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
