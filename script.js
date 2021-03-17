function verifyPhone(phone) {
    parseInt(phone)
    if (phone>999999999 && phone<10000000000) {
        return true;
    } else {
        return false;
    }
}

function invalidHighlight(obj) {
    $(obj).css("border", "2px solid rgb(245, 198, 210)")
    $(obj).hover(function(){
        $(this).css("background-color", "rgb(245, 198, 210)");
        }, function(){
        $(this).css("background-color", "rgba(0, 0, 0, 0)");
    });
}

function resetHighlight(obj) {
    $(obj).css("border", "2px solid rgb(193, 206, 227)")
    $(obj).hover(function(){
        $(this).css("background-color", "rgb(193, 206, 227)");
        }, function(){
        $(this).css("background-color", "rgba(0, 0, 0, 0)");
    });
}

$(document).ready(function(){

    $("#street").hide()
    $("input[name=street]").hide()
    $("#city").hide()
    $("input[name=city]").hide()

    $("select").change(function(){
        var subtotal = 0;
        for (i=0; i< menuItems.length; i++) {
            var quan = parseInt($("select").eq(i).val())
            var cost = menuItems[i].cost;
            var total = quan * cost;
            $("input[name=cost]").eq(i).val(total.toFixed(2))
            subtotal = subtotal + total;
        }

        $("#subtotal").val(subtotal.toFixed(2))
        $("#tax").val((subtotal*0.0625).toFixed(2))
        $("#total").val((subtotal*1.0625).toFixed(2))

    });

    $(":radio").change(function(){
        if(this.value == "delivery") {
            $("#street").show()
            $("input[name=street]").show()
            $("#city").show()
            $("input[name=city]").show()
        } else {
            $("#street").hide()
            $("input[name=street]").hide()
            $("#city").hide()
            $("input[name=city]").hide()
        }
    });

    $(":button").click(function(){
        var badLname = $("input[name=lname]").val() == "";
        var badPhone = !verifyPhone($("input[name=phone]").val());
        var delivery = $(":radio").eq(1).is(':checked');
        var badStreet = $("input[name=street]").val() == "";
        var badCity = $("input[name=city]").val() == "";
        var badQuan = false;

        var quan = 0;
        for (i=0; i< menuItems.length; i++) {
            quan = quan + parseInt($("select").eq(i).val());
        }
        if (quan==0) {
            badQuan = true;
        }

        var message = "Please check the following items:\n";
        var badForm = false;

        if(badLname) {
            badForm = true;
            message += " - Last name cannot be blank\n";
            invalidHighlight($("input[name=lname]"));
        } else {
            resetHighlight($("input[name=lname]"));
        }

        if(badPhone) {
            badForm = true;
            message += " - Phone number is invalid\n";
            invalidHighlight($("input[name=phone]"));
        } else {
            resetHighlight($("input[name=phone]"));
        }

        if(badQuan) {
            badForm = true;
            message += " - Please select at least one item\n";
            invalidHighlight($("select"));
        } else {
            resetHighlight($("select"));
        }

        if(delivery) {
            if(badStreet) {
                badForm = true;
                message += " - Street cannot be blank\n";
                invalidHighlight($("input[name=street]"));
            } else {
                resetHighlight($("input[name=street]"));
            }
            if(badCity) {
                badForm = true;
                message += " - City cannot be blank\n";
                invalidHighlight($("input[name=city]"));
            } else {
                resetHighlight($("input[name=city]"));
            }
        }

        if(badForm) {
            alert(message);
        } else {
            var date = new Date();
            var available;
            localStorage.setItem("time", date);
            localStorage.setItem("numItems", menuItems.length);
            localStorage.setItem("total", $("#total").val());

            if(delivery){
                available = new Date(date.getTime() + 30*60000);
                localStorage.setItem("available", "Your order will be delivered at:<br>" + available);
            } else {
                available = new Date(date.getTime() + 15*60000);
                localStorage.setItem("available", "Your order will be available for pickup at:<br>" + available);
            }


            for (i=0; i< menuItems.length; i++) {
                localStorage.setItem(i.toString()+"name", menuItems[i].name);
                localStorage.setItem(i.toString()+"quan", parseInt($("select").eq(i).val()));
            }
            window.open("order.html", "_blank");
        }


    });



});

