$(document).ready(function () {

$('#empViewTable').load(viewPerson);

    function viewPerson() {
        $( "#result-temp" ).html( "<strong> Inprogress to get the Employees Data from the server </strong>" );
        var empId = getParameterByName("empId");
        console.log("employee id:"+empId);
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/"+empId,
            dataType: 'json',
            success: function( response ) {
                console.log("Response from Server:"+response);
                //console.log(response.length);
                var html = '';
                if (response != null) {
                    console.log(response.empid);

                    $('#empid').html(response.empid);
                    $('#firstName').html(response.firstName);
                    $('#lastName').html(response.lastName);
                    $('#emailId').html(response.emailId);
                    $('#dob').html(response.dob);
                    $('#doj').html(response.doj);
                    $('#phoneNum').html(response.phoneNum);
                    $( "#result-temp" ).html( "<strong> Successfully to get the Employees Data from the server </strong>" );
                    /*$('.empData').each(function () {

                     var lastColumn = $(this).html();
                     var replaceValue = lastColumn + "Changed Content";

                     jQuery(this).html(replaceValue);
                     });*/
                }
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees Data from the server </strong>" );
            }
        });
    };
});