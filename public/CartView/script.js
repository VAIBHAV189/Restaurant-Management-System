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

function getCurrDate(){
    return new Promise((resolve,reject)=>{
      var today = new Date();
      console.log(typeof(today));
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10){
        dd='0'+dd;
      } 
      if(mm<10){
        mm='0'+mm;
      } 
      today = yyyy +'-'+ mm +'-'+ dd;
      console.log(today);
      resolve(today);
    })
}

$(()=>{
    
    $('#cart').hide()

    $.get('/root/username',(data)=>{
        console.log(data.username);
        if(data.username){
            $('#modalName').val(data.username)
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

  let obj = {};

  cross.click(function() {
    modal.hide();
    $('body').removeClass('blur')
    $('modal').removeClass('opaque')
  })

  $('#book').click(function(){
        console.log("Confirm Button was pressed")

        $.get('/cart/getcart',(data)=>{
            let total = 0
            Object.keys(data).forEach((key,index)=>{
                total+=(data[key][0]*data[key][1])
            });
            $('#modalCost').val(total)
            
            $('body').addClass('blur')
            modal.addClass('opaque')
            modal.css("display", "block")

            obj.username = $('#modalName').val()
            obj.paymentAmount = total
            obj.orderData = data

            getCurrDate().then((mydate)=>{
                $('#modalDate').val(mydate)
                obj.date = mydate
            })

        })

    })

    $('#modalSubmit').on('click',()=>{
        $.post('/cart/confirmcart',obj,(data)=>{
            if(data=='Success'){
                console.log(data)
                console.log('Order Confirmed');
                modal.hide();
                // let auth_key = "xczHw6MdR4gAFjVGfei3lbpahOTvuQyCUDsZK7SWBo2q9E58nLfYjiktsDxLeXRNHMpIuGq34ACOKdWw"

                // var settings = {
                // "async": true,
                // "crossDomain": true,
                // "url": "https://www.fast2sms.com/dev/bulk?authorization=" + auth_key + "&sender_id=FSTSMS&message=%0aMr." +New_obj.Name+ "!! Thanks for Ordering from Food Buff %0aYour Order No is: "+New_obj.vehicleNumber+"%0aSlot alloted to you is: " +New_obj.slot_number+" %0aYour security key is: "+New_obj.key+"%0a%0a Use this key to login into our Web/Android app for LIVE MONITORING OF YOUR VEHICLE!!. %0a%0aLink to our Android app : https:Googleplaystore/ParkingSystem/apk %0aLink to our Web portal: https:webPortal/UserLogin.gov &language=english&route=p&numbers=" + New_obj.phoneNumber,
                // "method": "GET"
                // }
                
                // $.ajax(settings).done(function (response) {
                //     console.log(response.val());
                // console.log('Message Sent to Mobile Phone number ' + New_obj.phoneNumber + '!!')
                // });
                refresh();
            }
            else{
                alert('Failure! Please Try Again');
            }
        })
    })

})

function refresh(){ 
    $('#mycart tr').remove();
    
    console.log("Refresh Called")
    $.get('/cart/getcart',(data)=>{
        let total = 0;
        // console.log(data);
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
        if(total>0){
            console.log("hi 1")
            $('.wrapper').append(`<h4>Payable Amount: <b>Rs ${total}</b></h4>`)
        }
        else{
            $('.wrapper').empty()
            $('.wrapper').append('<h3>Cart is empty</h3>')
        }
    });
};

