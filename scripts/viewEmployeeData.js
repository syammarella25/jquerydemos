$(document).ready(function () {


    var empId = getParameterByName("empid");
    console.log(empId);

    if(empId == "") {
        $('#add').show();
        $('#update').hide();
    } else {
        $('#add').hide();
        $('#update').show();
        //$('#update').onclick(updateEmployee());
    }



    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $('#empViewTable').load(viewPerson());

    function viewPerson() {
        var empId = getParameterByName("empid");
        console.log("employee id:" + empId);
        if (empId != "") {

            $("#result-temp").html("<strong> Inprogress to get the Employees Data from the server </strong>");

            $.ajax({
                url: "http://localhost:9090/SystemInfo/rest/employee/" + empId,
                dataType: 'json',
                success: function (response) {
                    console.log("Response from Server:" + response);
                    //console.log(response.length);
                    var html = '';
                    if (response != null) {
                        console.log(response.empid);

                        $('#employeeid')[0].innerHTML = (response.empid);
                        $('#firstName')[0].value = response.firstName;
                        $('#lastName')[0].value = (response.lastName);
                        $('#emailId')[0].value = (response.emailId);
                        $('#dob')[0].value = (response.dob);
                        $('#doj')[0].value = (response.doj);
                        $('#phoneNum')[0].value = (response.phoneNum);
                        $("#result-temp").html("<strong> Successfully to get the Employees Data from the server </strong>");
                        /*$('.empData').each(function () {

                         var lastColumn = $(this).html();
                         var replaceValue = lastColumn + "Changed Content";

                         jQuery(this).html(replaceValue);
                         });*/
                    }
                },
                error: function (response) {
                    console.log(response);
                    $("#result-temp").html("<strong> Failed to get the Employees Data from the server </strong>");
                }
            });
        }
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                if (this.name == "empid") {
                    o[this.name] = parseInt(this.value);
                } else {
                    o[this.name] = this.value || '';
                }
            }
        });
        return o;
    };

    $( "#dob" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });
    $( "#doj" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });



    $("#empForm").submit(function (event) {
        event.preventDefault();
        var formData = JSON.stringify($('#empForm').serializeObject());
        //formData = formData.substring(1,formData.length-1);
        $("#result-temp").html("Sending the request..");
        console.log(formData);
        var type = '';
        var url = 'http://localhost:9090/SystemInfo/rest/employee/';
        if (empId != '') {
            type = 'put';
            url +='update';
        } else {
            type='post';
            url+='create';
        }
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            contentType: 'application/json; charset=utf-8',
            data: formData,
            success: function (response) {
                console.log("success"+response);
                //console.log(response.length);
                $("#result-temp").html("<strong> " + response + " Successfully from the server </strong> ");
                $(location).attr('href','viewEmployeeData.html?empid='+empId);
            },
            error: function (response) {
                console.log("failure" + response);
                //alert(response);
                $("#result-temp").html("<strong> Failed to get the Employees List from the server </strong> ");
            }
        });
    });

});