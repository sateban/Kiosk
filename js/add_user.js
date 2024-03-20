$(document).ready(function () {

	$('#btn_add').click(function () {


		var lname = $('#lname').val();
		var fname = $('#fname').val();
		var mname = $('#mname').val();
		var contact = $('#contact').val();
		var pass_word = $('#pass_word').val();
		var role = $('#role').val();
		var email = $('#email').val();

		if (lname == "") {
			// alert("Please Enter Last Name");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Last Name',
				showConfirmButton: true,
			});
			$('#lname').focus();
		} else if (fname == "") {
			// alert("Please Enter First Name");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter First Name',
				showConfirmButton: true,
			});
			$('#fname').focus();
		} else if (mname == "") {
			// alert("Please Enter Middle Name");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Middle Name',
				showConfirmButton: true,
			});
			$('#mname').focus();
		} else if (contact == "") {
			// alert("Please Enter Contact Info");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Contact Info',
				showConfirmButton: true,
			});
			$('#contact').focus();
		} else if (pass_word == "") {
			// alert("Please Enter Contact Info");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Password',
				showConfirmButton: true,
			});
			$('#pass_word').focus();
		} else if (role == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter your Account Type',
				showConfirmButton: true,
			});
			$('#role').focus();
		} else if (email == "") {
			// alert("Please Enter Email");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Email',
				showConfirmButton: true,
			});
			$('#email').focus();
		} else {
			// var msg = confirm("Do you want to ADD this NEW RECORD?");

			Swal.fire({
				title: 'Are you sure?',
				text: "Do you want to ADD this NEW RECORD?",
				icon: 'info',
				showCancelButton: true,
				confirmButtonColor: '#179918',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			}).then((result) => {
				if (result.isConfirmed) {
					$.ajax({
						url: "add_user.php",
						type: "POST",
						data: "lname=" + lname + "&fname=" + fname + "&mname=" + mname + "&contact=" + contact + "&pass_word=" + pass_word + "&role=" + role + "&email=" + email,
						success: function (data) {
							if (data == "ok") {
								Swal.fire({
									icon: 'success',
									title: 'User Succesfully Added!',
									showConfirmButton: false,
									timer: 1500
								});
								// alert("");
								$('#lname').val("");
								$('#fname').val("");
								$('#mname').val("");
								$('#contact').val("");
								$('#pass_word').val("");
								$('#role').val("");
								$('#email').val("");

							} else {
								// alert("Add User Failed: "+data);
								Swal.fire({
									icon: 'warning',
									title: 'Add User Failed!' + data,
									showConfirmButton: false,
									timer: 1500
								});
							}
						}
					});
				}
			})


		}
	});

});