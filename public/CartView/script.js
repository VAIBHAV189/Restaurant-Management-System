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
    $('#cart').hide()

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
            alert("You have not logged in....Redirecting to home page")
            document.location='/'
        }
        
    });

    // Get the modal
  var modal = $("#myModal");

  var book = $("#book");

  var cross =$("#close");

  

  cross.click(function() {
    modal.hide();
    $('body').removeClass('blur')
    $('modal').removeClass('opaque')
  })

  $('#book').click(function(){
    console.log("Submit Button was pressed")
    
            $('body').addClass('blur')

            modal.addClass('opaque')

            modal.css("display", "block")

  })

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
            $('.wrapper').append(`<h4>Payable Amount: <b>Rs ${total}</b></h4>`);
        else    
            $('.wrapper').append('<h3>Cart is empty</h3>');
    });
};

