$(document).ready(function () {
    // $(".payment > input:checkbox").on('click', function(e) {
    //     if($("#cash_full").is(":checked")){
    //         $("#cash_full").prop("checked", true);
    //         $("#installment").prop("checked", false);
    //     } else if(!$("#cash_full").is(":checked")){
    //         $("#cash_full").prop("checked", false);
    //         $("#installment").prop("checked", true);
    //     } 
    //   });

	$('#btn_add').click(function () {

        var second = $("#second").is(":checked");
        var third = $("#third").is(":checked");
        var fourth = $("#fourth").is(":checked");
        var none = $("#none").is(":checked");

        var sibDiscount = "";

        sibDiscount += second ? "S" : "";
        sibDiscount += third ? "T" : "";
        sibDiscount += fourth ? "F" : "";
        sibDiscount += none ? "N" : "";

        console.log(sibDiscount);

		var tsc_id = $('#tsc_id').val();
		var fname = $('#fname').val();
		var mname = $('#mname').val();
        var lname = $('#lname').val();
        var extension = $('#extension').val();
		var gender = $('#gender').val();
		var dob = $('#dob').val();
		var home_adds = $('#home_adds').val();
        var cont_old = $('#cont_old').val();
        var grade_lvl = $('#grade_lvl').val();
        var siblings = sibDiscount;//$('#siblings').val();
        var esc_grant = $('#esc_grant').val();
        var gov_voucher = $('#gov_voucher').val();
        var strand = $('#strand').val();
        var vaccine = $('#vaccine').val();
        var pay_option = $('#pay_option').val();
        var parent_enrolled = $('#parent_enrolled').val();
        var parent_cont = $('#parent_cont').val();
        var parent_email = $('#parent_email').val();
        var enrolCondition = $('#term_cond').is(":checked");
        var payCondition = $('#pay_proc').is(":checked");

        if (!enrolCondition) {
			// alert("Please Enter Last Name");
			Swal.fire({
				icon: 'info',
				title: 'You haven\'t agreed with Enrollment Terms and Condition',
				showConfirmButton: true,
			});
			// $('#tsc_id').focus();
		} else if (!payCondition) {
			// alert("Please Enter Last Name");
			Swal.fire({
				icon: 'info',
				title: 'You haven\'t agreed with Payment Condition',
				showConfirmButton: true,
			});
			// $('#tsc_id').focus();
		} else if (tsc_id == "") {
			// alert("Please Enter Last Name");
			Swal.fire({
				icon: 'info',
				title: 'Please School ID',
				showConfirmButton: true,
			});
			$('#tsc_id').focus();
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
		}else if (lname == "") {
			// alert("Please Enter Middle Name");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Middle Name',
				showConfirmButton: true,
			});
			$('#lname').focus();
		} else if (extension == "") {
			// alert("Please Enter Contact Info");
			Swal.fire({
				icon: 'info',
				title: 'EXTENSION (E.G. III, JR., SR.)',
				showConfirmButton: true,
			});
			$('#extension').focus();
		} else if (gender == "") {
			// alert("Please Enter Contact Info");
			Swal.fire({
				icon: 'info',
				title: 'Please Gender',
				showConfirmButton: true,
			});
			$('#gender').focus();
		} else if (dob == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Date of Birth',
				showConfirmButton: true,
			});
			$('#dob').focus();
		} else if (home_adds == "") {
			// alert("Please Enter Email");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Home Address',
				showConfirmButton: true,
			});
			$('#home_adds').focus();
		}else if (cont_old == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter your Contact Number',
				showConfirmButton: true,
			});
			$('#cont_old').focus();
		} else if (grade_lvl == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter your Grade Level',
				showConfirmButton: true,
			});
			$('#grade_lvl').focus();
		} else if (siblings == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Siblings',
				showConfirmButton: true,
			});
			$('#siblings').focus();
		} else if (esc_grant == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'ESC grant',
				showConfirmButton: true,
			});
			$('#esc_grant').focus();
		} else if (gov_voucher == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Government Voucher',
				showConfirmButton: true,
			});
			$('#gov_voucher').focus();
		} else if (strand == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter your Strand',
				showConfirmButton: true,
			});
			$('#strand').focus();
		} else if (vaccine == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Vaccine',
				showConfirmButton: true,
			});
			$('#vaccine').focus();
		} else if (pay_option == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Payment Options',
				showConfirmButton: true,
			});
			$('#pay_option').focus();
		} else if (parent_enrolled == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Full Name',
				showConfirmButton: true,
			});
			$('#parent_enrolled').focus();
		} else if (parent_cont == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Contact Number',
				showConfirmButton: true,
			});
			$('#parent_cont').focus();
		} else if (parent_email == "") {
			// alert("Please Enter your Account Type");
			Swal.fire({
				icon: 'info',
				title: 'Please Enter Email',
				showConfirmButton: true,
			});
			$('#parent_email').focus();
		}  else {
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
						url: "enrollmentoldstudent.php",
						type: "POST",
						data: "tsc_id=" + tsc_id 
                        + "&fname=" + fname + "&mname=" + mname + "&lname=" + lname + "&extension=" + extension 
                        + "&gender=" + gender + "&dob=" + dob + "&home_adds=" + home_adds 
                        + "&cont_old=" + cont_old + "&grade_lvl=" + grade_lvl  + "&siblings=" + siblings
                        + "&esc_grant=" + esc_grant + "&gov_voucher=" + gov_voucher + "&strand=" + strand
                        + "&vaccine=" + vaccine 
                        + "&pay_option=" + pay_option + "&parent_enrolled=" + parent_enrolled + "&parent_cont=" + parent_cont
                        + "&parent_email=" + parent_email,
						success: function (data) {
                            console.log(data);
							if (data == "ok") {
								Swal.fire({
									icon: 'success',
									title: 'User Succesfully Added!',
									showConfirmButton: false,
									timer: 1500
								});
								// alert("");
								$('#tsc_id').val("");
								$('#fname').val("");
								$('#mname').val("");
								$('#lname').val("");
								$('#extension').val("");
								$('#gender').val("");
								$('#home_adds').val("");
                                $('#cont_old').val("");
                                $('#grade_lvl').val("");
                                $('#second').prop("checked", false);
                                $('#third').prop("checked", false);
                                $('#fourth').prop("checked", false);
                                $('#none').prop("checked", false);
                                $('#esc_grant').val("");
                                $('#gov_voucher').val("");
                                $('#strand').val("");
                                $('#vaccine').val("");
                                $('#term_cond').prop("checked", false);
                                $('#pay_proc').prop("cheked", false);
                                $('#pay_option').val("");
                                $('#parent_enrolled').val("");
                                $('#parent_cont').val("");
                                $('#parent_email').val("");
								$('#formuploadVaccine').val("");
                                $('#formuploadReceipt').val("");
                                $('#formuploadCard').val("");

							} else {
								// alert("Add User Failed: "+data);
								Swal.fire({
									icon: 'warning',
									title: 'Add User Failed!' + data,
									showConfirmButton: false,
									// timer: 1500
								});
							}
						}
					});
				}
			})


		}
	});

});