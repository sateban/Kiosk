$(document).ready(function () {

  //  append values in input fields
  $('tr #btn_edit').click(function () {

    var ID = $(this).closest('tr').find('#ID').text();
    var LastName = $(this).closest('tr').find('#LastName').text();
    var FirstName = $(this).closest('tr').find('#FirstName').text();
    var MiddleName = $(this).closest('tr').find('#MiddleName').text();
    var Contact = $(this).closest('tr').find('#Contact').text();
    var Password = $(this).closest('tr').find('#PassW').text();
    var Email = $(this).closest('tr').find('#email').text();
    var Role = $(this).closest('tr').find('#role').text();


    $('#modalID').val(ID);
    $('#modalLastName').val(LastName);
    $('#modalFirstName').val(FirstName);
    $('#modalMiddleName').val(MiddleName);
    $('#modalContact').val(Contact);
    $('#modalPassword').val("");
    $('#modalPassword').attr("placeholder", "New Password");
    $('#modalEmail').val(Email);
    $('#modalRole').val(Role);

  });

  // now create event to get data from fields and update in database 

  $('#btn_update').click(function () {

    var ID = $('#modalID').val();
    var LastName = $('#modalLastName').val();
    var FirstName = $('#modalFirstName').val();
    var MiddleName = $('#modalMiddleName').val();
    var Contact = $('#modalContact').val();
    var Password = $('#modalPassword').val();
    var Email = $('#modalEmail').val();
    var Role = $('#modalRole').val();

    if ($("#modalPassword").val() == "") {
      Swal.fire(
        'Invalid Input',
        'Please input your password',
        'info'
      );

    } else if ($("#modalPassword").val().length <= 7) {
      Swal.fire(
        'Invalid Input',
        'Please input minimum number of characters',
        'info'
      );
    } else {



      $.ajax({
        url: 'updatephp.php',
        method: 'POST',
        data: '&ID=' + ID + '&LastName=' + LastName + '&FirstName=' + FirstName + '&MiddleName=' + MiddleName + '&Contact=' + Contact + '&PassW=' + Password + '&email=' + Email + '&role=' + Role + '&btn_update=update',
        success: function (response) {
          console.log(response);

          if (response == 'success') {
            // alert("Record has been Succesfully Updated!");
            Swal.fire(
              'Success',
              'Record successfully updated!',
              'success'
            ).then((result) => {
              window.location = "table.php";
            });
          } else {
            Swal.fire(
              'Failed!',
              'Record update failed!',
              'warning'
            );
            // alert("Sorry. Cannot  Update Selected Record!");
            // alert(response);
          }
        }
      });
    }
  });
});