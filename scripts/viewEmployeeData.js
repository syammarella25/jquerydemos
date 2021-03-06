$(document).ready(function () {

    var empId = getParameterByName("empId");
    console.log(empId);
    $('#empViewTable').load(viewPerson);
    if(empId == "") {
        $('#add').show();
        $('#update').hide();
    } else {
        $('#add').hide();
        $('#update').show();
    }



    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function viewPerson() {
        var empId = getParameterByName("empId");
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

                        $('#empid').html(response.empid);
                        $('#fname').html(response.firstName);
                        $('#lname').html(response.lastName);
                        $('#emailId').html(response.emailId);
                        $('#dob').html(response.dob);
                        $('#doj').html(response.doj);
                        $('#phoneNum').html(response.phoneNum);
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

    $( "#dobdate" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });
    $( "#dojdate" ).datepicker({
        inline: true,
        dateFormat: "yy-mm-dd"
    });

    $("#empForm").submit(function (event) {
        event.preventDefault();
        var formData = JSON.stringify($('#empForm').serializeObject());
        //formData = formData.substring(1,formData.length-1);
        $("#result-temp").html("Sending the request..");
        console.log(formData);
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/create",
            dataType: 'json',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: formData,
            success: function (response) {
                console.log("success"+response);
                //console.log(response.length);
                $("#result-temp").html("<strong> " + response + " Successfully from the server </strong> ");
                $(location).attr('href','listEmployee.html')
            },
            error: function (response) {
                console.log("failure" + response);
                //alert(response);
                $("#result-temp").html("<strong> Failed to get the Employees List from the server </strong> ");
            }
        });
    });

});