$(()=>{
    $('.updateEmployee').click(function(){
        let td = $(this).parent().siblings();
        let obj = {
            id: td['0'].innerHTML,
            jobTitle: td['1'].innerHTML,
            name: td['2'].innerHTML,
            phoneNumber: td['3'].innerHTML,
            resAdd: td['4'].innerHTML
        }
        $.post('/updateEmployee',obj)
    })
})