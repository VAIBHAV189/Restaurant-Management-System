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

function filter_users() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("customers_table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}

function filter_jobs() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter1");
    filter = input.value.toUpperCase();
    table = document.getElementById("jobs_table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}