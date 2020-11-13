function refresh(){
    console.log("Printing Previous Orders & Reservations : \n")
    $.get('/cart/history',(data)=>{
        data.forEach((order)=>{
            console.log(order)
        })
    })
    $.get('/reservation/history',(data)=>{
        data.forEach((reservation)=>{
            console.log(reservation)
        })
    })
}

$(()=>{
    refresh()
})
