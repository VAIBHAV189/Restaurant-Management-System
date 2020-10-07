function loginCheck(){
    return new Promise(function(resolve,reject){
        
        $.get('/root/username',(data)=>{
            console.log(data.username);
            if(data.username){
                console.log("Here");
                $('#login').hide()
                $('#signUp').hide()
                $('#user').html("Welcome " + data.username)
                $('#user').show();
                $('#logout').show();
                resolve(data)
            }
            reject(err)
        });
    });
}
//ue 
//acha mein ada ka wo progress report likhlun> 5 min bas cart view chal jaye _/\_ok
$(()=>{
    
    $('#logout').hide()
    $('#user').hide()

    $.get('/root/username',(data)=>{
        console.log(data.username);
        if(data.username){
            console.log("Here");
            $('#login').hide()
            $('#signUp').hide()
            $('#user').html("Welcome " + data.username)
            $('#user').show();
            $('#logout').show();
            $('#cart').click();
        }
        else{
            alert('Please login');
        }
    });
})
function refresh(){ 
    let total = 0;
    $('#mycart tr').remove();
    
    console.log("Refresh Called")
    $.get('/cart/getcart',(data)=>{
        console.log('print karake dekhte')
        console.log(data);
        let i = 1;
        Object.keys(data).forEach((key,index)=>{
            $('#mycart').append(
                $('<tr>').append(
                    `<td>${i}. </td>`,
                    `<td>${key}(X  ${data[key][1]})</td>`,
                    `<td>${(data[key][0]*data[key][1])}</td>`
                )
            )
            i++;
            console.log(i);
            total+=(data[key][0]*data[key][1]);
        })
        if(total>0)
            $('.bg-text').append(`<h4>Your Total Is :  <b>${total}</b></h4>`);
        else    
            $('.bg-text').append('You havent ordered any food yet');
    });
};

