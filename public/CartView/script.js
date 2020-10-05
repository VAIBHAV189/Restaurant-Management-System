$(document).ready(()=>{
    $.get('/root/username',(data)=>{
        if(data.login==true){
            console.log("Welcome " + data.username);
        }
        else{
            alert("Please Login");
            document.location.href='/root/login';
        }
    });
    $("#cart")
         .hide()
         .click();
});

function refresh(){
    let total = 0;
    $('#mycart tr').remove();
    $.get('/cart/getcart',(data)=>{
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
            total+=(data[key][0]*data[key][1]);
        })
        if(total>0)
            $('.bg-text').append(`<h4>Your Total Is :  <b>${total}</b></h4>`);
        else    
            $('.bg-text').append('You havent ordered any food yet');
    });
};

