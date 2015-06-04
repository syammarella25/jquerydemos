$('document').ready(function(){
    //$('#empListTable').dataTable();
    $("#empListDiv").load(loadPerson());
    function loadPerson() {
        $("#result-temp" ).html( "<strong> Loading Employees List from the server </strong>" );
        $.ajax({
            url: "http://localhost:9090/SystemInfo/rest/employee/list",
            dataType: 'jsonp',
            success: function( response ) {
                console.log(response);
                console.log(response.length);
                console.log(response[0]);
                //var resultJSON = $.parseJSON(response);
                /*console.log(resultJSON);*/
                /*$('#empListTable tr').not(':first').not(':last').remove();
                var html = '';*/
                var html = '<table id="empListTable" class="display"><thead><tr><th>EMP ID</th><th>First Name</th><th>Last Name</th><th>Date Of Birth</th>';
                html += '<th>Date Of Joining</th><th>Email Id</th><th>Phone Number</th><th>Action</th></tr></thead>';
                html += '<tfoot><tr><th>EMP ID</th><th>First Name</th><th>Last Name</th><th>Date Of Birth</th>';
                html += '<th>Date Of Joining</th><th>Email Id</th><th>Phone Number</th><th>Action</th></tr></tfoot>';
                html += '<tbody>'
                for(var i = 0; i < response.length; i++) {
                    var empId=response[i].empid;
                    //var deleteHtml = '<td><a href="javascript:void(0);" class="delete" onclick="removePerson('+response[i].empid+');">Delete</a></td>';
                    var deleteHtml = '<td><a href="deleteEmployee.html?empId='+empId+'">Delete</a></td>';
                    var viewHtml = '<td><a href="viewEmployee.html?empId='+empId+'">'+empId+'</a></td>';
                    html += '<tr>' + viewHtml +'<td>' + response[i].firstName + '</td><td>'+
                    response[i].lastName + '</td><td>' + response[i].dob +  '</td><td>' + response[i].doj + '</td><td>' + response[i].emailId + '</td><td>'+
                    + response[i].phoneNum + '</td>' + deleteHtml +'</tr>';
                }
                html +='</tbody>';
                //$('#empListTable tr').first().after(html);
                $('#empListDiv').html(html);
                $('#empListTable').dataTable();

                $( "#result-temp" ).html( "<strong> Successfully got the Employees List from the server</strong>" );
            },
            error: function(response){
                console.log(response);
                $( "#result-temp" ).html( "<strong> Failed to get the Employees List from the server </strong>" );
            }
        });
    }
});