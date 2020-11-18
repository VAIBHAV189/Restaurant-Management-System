function loginCheck(){
    return new Promise(function(resolve,reject){
        
        $.get('/root/username',(data)=>{
            console.log(data.username);
            if(data.username){
                $('#login').hide()
                $('#signUp').hide()
                $('#user').html("Welcome, " + data.username.toUpperCase())
                $('#user').show();
                $('#logout').show();
                resolve(data)
            }
            else{
                reject(err)
            }
        });
    });
}

$(()=>{

    $('#logout').hide()
    $('#user').hide()   

    $.get('/root/username',(data)=>{
        if(data.username){
            $('#login').hide()
            $('#signUp').hide()
            $('#user').html("Welcome, " + data.username.toUpperCase())
            $('#user').show();
            $('#logout').show();
        }
    });

    function appendItems(obj) {
        let str = ""
        for(let items in obj) {
            str = str + `
            <div class="row">
                <div class="col-4 name">
                    <div class="content">` + obj[items].itemName + ` </div>
                </div>
                <div class="col-2 price">
                    <div class="content">` + obj[items].itemPrice + `</div>
                </div>
                <div class="col 4">
                    <img src="../food/give/`+ obj[items].id +`" width="120" height="100">
                </div>
                <div>
                    <button type="button" class="btn btn-dark add">Add</button>
                </div>
                <div class="cnt">
                    <button class="dec">-</button>
                    <span class="update">1</span>
                    <button class="inc">+</button>
                </div>
            </div>
            <br>
            `
        }
        return str
    }
    $.get('/root/menu',
        function(data) {
            let num = 1;
            for(let itemType in data) {
                $('.appendMenu').append(`
                    <input type="radio" name="accordion" id="cb`+ num +`" class="arrow" />
                    <section class="box">
                        <label class="box-title foodType" for="cb`+ num +`">`+ itemType + `</label>
                        <label class="box-close" for="acc-close"></label>
                        <div class="box-content">
                            ` + appendItems(data[itemType]) +`
                        </div>
                    </section>
                `)
                num++;
            }
            $('.cnt').hide();

            $('.add').on('click',function(){
                console.log('print ho ja saale')
                let obj = {
                    name : ($(this).parent()).siblings(".name").children().text(),
                    price : +(($(this).parent()).siblings(".price").children().text()),
                    times : +(($(this).parent()).siblings(".cnt").children('.update').text())
                };
                let res = false;
                loginCheck().then(function(user){
                    res = true;
                    $.post('/cart/addcart',obj,(data)=>{
                        if(data == 'Success'){
                        }
                        else{
                            let obj_new = {
                                name : obj.name,
                                price : obj.price,
                                work : 'inc'
                            }
                            $.post('/cart/updatecart',obj_new,(data)=>{})
                        }
                    });
                })
                .catch(function(){
                    document.location.href='/root/login';
                });
                $(this).parent().siblings('.cnt').show();
            });
            
            $('.dec').on('click',function(){
                let v = $(this).parent().children('.update').text();
                v--;
                $(this).parent().children('.update').text(v);
                let obj = {
                    name : ($(this).parent()).siblings('.name').children().text(),
                    price : +(($(this).parent()).siblings(".price").children().text()),
                    work : 'dec'
                };
                $.post('/cart/updatecart',obj,(data)=>{});
                if(v == '0'){
                    $(this).parent().children('.update').text("1");
                    $(this).parent('.cnt').hide();
                }
            
            });
            
            $('.inc').on('click',function(){
                let v = $(this).parent().children('.update').text();
                v++;
                console.log(v);
                $(this).parent().children('.update').text(v);
                let obj = {
                    name : ($(this).parent()).siblings('.name').children().text(),
                    price : +(($(this).parent()).siblings(".price").children().text()),
                    work : 'inc'
                };
                $.post('/cart/updatecart',obj,(data)=>{
                    
                });
            });
            
            $("#logout").on('click',function(){
                $.get("/root/logout",(data)=>{
                    // console.log(data);
                });
            });

        })
    
})