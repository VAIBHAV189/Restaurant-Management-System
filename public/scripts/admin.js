$(()=>{
    $('.show').show()
    $('.hide').hide()

    let toggles = ["orders", "employee", "menu", "jobs", "customers"]
    let nums = ["one", "two", "three", "four", "five"]
    let map = {
        "one": "employee",
        "two": "menu",
        "three": "jobs",
        "four": "customers",
        "five": "orders"
    }
    function switchClasses(toggles, str) {
        toggles.forEach(function(value) {
            let s = '.'+value
            $(s).removeClass('show')
            $(s).addClass('hide')
        })
        let s = '.'+map[str]
        $(s).removeClass('hide')
        $(s).addClass('show')
        nums.forEach(function(value) {
            $('#'+value).removeClass('active')
        })
        $('#'+str).addClass('active')
    }
    $('#one, #two, #three, #four, #five').click(function(){
        console.log('id of clicked', $(this).attr('id'))
        switchClasses(toggles, $(this).attr('id'))
        $('.show').show()
        $('.hide').hide()
    })
})