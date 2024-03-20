$(document).ready(function () {

    $('#btn_enroll').click(function () {


        //learn_f - FAMILYdd/FRIENDS
        //learn_tg - TEACHERS/​GUIDANCE COUNSELORS
        //learn_co - CAREER ORIENTATIONS
        //learn_o - OTHERS

        // var learn_f = $("#learn_f").is(":checked");
        // var learn_tg = $("#learn_tg").is(":checked");
        // var learn_co = $("#learn_co").is(":checked");
        // var learn_o = $("#learn_o").is(":checked");

        // var learnTsc = "";

        // learnTsc += learn_f ? "F" : "";
        // learnTsc += learn_tg ? "TG" : "";
        // learnTsc += learn_co ? "CO" : "";
        // learnTsc += learn_o ? "Oth" : "";

        // console.log(learnTsc);

        var ref_num = $('#ref_number').val();
        var fname = $('#fname').val();
        var mname = $('#mname').val();
        var lname = $('#lname').val();
        var dob = $('#dob').val();
        var pob = $('#pob').val();
        var gender = $('#gender').val();
        var age = $('#age').val();
        var nationality = $('#nationality').val();
        var yearlvl = $('#yearlvl').val();
        var adds1 = $('#adds1').val();
        var adds2 = $('#adds2').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var zipcode = $('#zipcode').val();
        var country = $('#country').val();
        var religion = $('#religion').val();
        var contact = $('#contact').val();
        var email = $('#email').val();
        var school_name = $('#school_name').val();
        var school_adds = $('#school_adds').val();
        var father_fname = $('#father_fname').val();
        var father_mname = $('#father_mname').val();
        var father_lname = $('#father_lname').val();
        var fath_occu = $('#fath_occu').val();
        var mother_fname = $('#mother_fname').val();
        var mother_mname = $('#mother_mname').val();
        var mother_lname = $('#mother_lname').val();
        var moth_occu = $('#moth_occu').val();
        var guard_fname = $('#guard_fname').val();
        var guard_mname = $('#guard_mname').val();
        var guard_lname = $('#guard_lname').val();
        var relationship = $('#relationship').val();
        var sibling1_fname = $('#sibling1_fname').val();
        var sibling1_mname = $('#sibling1_mname').val();
        var sibling1_lname = $('#sibling1_lname').val();
        var prev1_lvl = $('#prev1_lvl').val();
        var sibling2_fname = $('#sibling2_fname').val();
        var sibling2_mname = $('#sibling2_mname').val();
        var sibling2_lname = $('#sibling2_lname').val();
        var prev2_lvl = $('#prev2_lvl').val();

        //additional for grade 11 form

        // var schl_name = $('#schl_name').val();
        // var schl_adds = $('#schl_adds').val();
        // var schl_cont = $('#schl_cont').val();
        // var schl_type = $('#schl_type').val();
        // var strand1 = $('#strand1').val();
        // var strand2 = $('#strand2').val();
        // var fam_fname1 = $('#fam_fname1').val();
        // var fam_mname1 = $('#fam_mname1').val();
        // var fam_lname1 = $('#fam_lname1').val();
        // var fam_relationship1 = $('#fam_relationship1').val();
        // var batch1 = $('#batch1').val();
        // var fam_cont1 = $('#fam_cont1').val();
        // var fam_fname2 = $('#fam_fname2').val();
        // var fam_mname2 = $('#fam_mname2').val();
        // var fam_lname2 = $('#fam_lname2').val();
        // var fam_relationship2 = $('#fam_relationship2').val();
        // var batch2 = $('#batch2').val();
        // var fam_cont2 = $('#fam_cont2').val();
        // // var learnTsc = learnTsc;
        // var sport = $('#sport').val();
        // var degree = $('#degree').val();

        if (ref_num == "") {
            // alert("Please Enter Learner Reference Number");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Learner Reference Number',
                showConfirmButton: true,
            });
            $('#ref_number').focus();
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
        } else if (lname == "") {
            // alert("Please Enter Last Name");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Last Name',
                showConfirmButton: true,
            });
            $('#lname').focus();
        } else if (dob == "") {
            // alert("Please your Date of Birth");
            Swal.fire({
                icon: 'info',
                title: 'Please your Date of Birth',
                showConfirmButton: true,
            });
            $('#dob').focus();
        } else if (pob == "") {
            // alert("Please Enter your Place of Birth");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter your Place of Birth',
                showConfirmButton: true,
            });
            $('#pob').focus();
        } else if (gender == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Gender',
                showConfirmButton: true,
            });
            $('#gender').focus();
        } else if (age == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Age',
                showConfirmButton: true,
            });
            $('#age').focus();
        } else if (nationality == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Nationality',
                showConfirmButton: true,
            });
            $('#nationality').focus();
        } else if (yearlvl == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Year Level',
                showConfirmButton: true,
            });
            $('#yearlvl').focus();
        } else if (adds1 == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Address 1',
                showConfirmButton: true,
            });
            $('#adds1').focus();
        } else if (adds2 == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Address 2',
                showConfirmButton: true,
            });
            $('#adds2').focus();
        } else if (city == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter City',
                showConfirmButton: true,
            });
            $('#city').focus();
        } else if (state == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter State/Province',
                showConfirmButton: true,
            });
            $('#state').focus();
        } else if (zipcode == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Zip Code',
                showConfirmButton: true,
            });
            $('#zipcode').focus();
        } else if (country == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Country',
                showConfirmButton: true,
            });
            $('#country').focus();
        } else if (religion == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Religion',
                showConfirmButton: true,
            });
            $('#religion').focus();
        } else if (contact == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Contact',
                showConfirmButton: true,
            });
            $('#contact').focus();
        } else if (email == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Email',
                showConfirmButton: true,
            });
            $('#email').focus();
        } else if (school_name == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Previous School Name',
                showConfirmButton: true,
            });
            $('#school_name').focus();
        } else if (school_adds == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Previous School Address',
                showConfirmButton: true,
            });
            $('#school_adds').focus();
        } else if (father_fname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Fathers First Name',
                showConfirmButton: true,
            });
            $('#father_fname').focus();
        } else if (father_mname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Fathers Middle Name',
                showConfirmButton: true,
            });
            $('#father_mname').focus();
        } else if (father_lname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Fathers Last Name',
                showConfirmButton: true,
            });
            $('#father_lname').focus();
        } else if (fath_occu == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Fathers Occupation',
                showConfirmButton: true,
            });
            $('#fath_occu').focus();
        } else if (mother_fname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Mothers First Name',
                showConfirmButton: true,
            });
            $('#mother_fname').focus();
        } else if (mother_mname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Mothers Middle Name',
                showConfirmButton: true,
            });
            $('#mother_mname').focus();
        } else if (mother_lname == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Mothers Last Name',
                showConfirmButton: true,
            });
            $('#mother_lname').focus();
        } else if (moth_occu == "") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Enter Mothers Occupation',
                showConfirmButton: true,
            });
            $('#moth_occu').focus();

        // } else if (schl_name == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter School Name',
        //         showConfirmButton: true,
        //     });
        //     $('#schl_name').focus();

        // } else if (schl_adds == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter School Address',
        //         showConfirmButton: true,
        //     });
        //     $('#schl_adds').focus();

        // } else if (schl_cont == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter School Contact Number',
        //         showConfirmButton: true,
        //     });
        //     $('#schl_cont').focus();
        //   }  else if (schl_type == "") {
        //         // alert("Please Enter Gender");
        //         Swal.fire({
        //             icon: 'info',
        //             title: 'Please Enter School Contact Number',
        //             showConfirmButton: true,
        //         });
        //         $('#schl_type').focus();
    
        //     }
        //  else if (strand1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Preferred Strand: 1st Choice',
        //         showConfirmButton: true,
        //     });
        //     $('#strand1').focus();

        // } else if (strand1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Preferred Strand: 2nd Choice',
        //         showConfirmButton: true,
        //     });
        //     $('#strand2').focus();

        // } else if (fam_fname1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter First Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_fname1').focus();

        // } else if (fam_mname1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Middle Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_mname1').focus();

        // } else if (fam_lname1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Last Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_lname1').focus();

        // } else if (fam_relationship1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Relationship',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_relationship1').focus();

        // } else if (batch1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Batch',
        //         showConfirmButton: true,
        //     });
        //     $('#batch1').focus();

        // } else if (fam_cont1 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Contact Number',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_cont1').focus();

        // } else if (fam_fname2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter First Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_fname2').focus();

        // } else if (fam_mname2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Middle Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_mname2').focus();

        // } else if (fam_lname2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Last Name',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_lname2').focus();

        // } else if (fam_relationship2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Relationship',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_relationship2').focus();

        // } else if (batch2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Batch',
        //         showConfirmButton: true,
        //     });
        //     $('#batch2').focus();

        // } else if (fam_cont2 == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Contact Number',
        //         showConfirmButton: true,
        //     });
        //     $('#fam_cont2').focus();
        // } else if (learnTsc == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Check atleast 1',
        //         showConfirmButton: true,
        //     });
        //     $('#learnTsc').focus();
        // } else if (sport == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Sport',
        //         showConfirmButton: true,
        //     });
        //     $('#sport').focus();
        // } else if (degree == "") {
        //     // alert("Please Enter Gender");
        //     Swal.fire({
        //         icon: 'info',
        //         title: 'Please Enter Degree',
        //         showConfirmButton: true,
        //     });
        //     $('#degree').focus();

            // } else if (guard_fname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Guardians First Name',
            //         showConfirmButton: true,
            //     });
            //     $('#guard_fname').focus();
            // } else if (guard_mname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Guardians Middle Name',
            //         showConfirmButton: true,
            //     });
            //     $('#guard_mname').focus();
            // } else if (guard_lname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Guardians Last Name',
            //         showConfirmButton: true,
            //     });
            //     $('#guard_lname').focus();
            // } else if (relationship == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Relationship',
            //         showConfirmButton: true,
            //     });
            //     $('#relationship').focus();
            // } else if (sibling1_fname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister1 First Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling1_fname').focus();
            // } else if (sibling1_mname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister1 Middle Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling1_mname').focus();
            // } else if (sibling1_lname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister1 Last Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling1_lname').focus();
            // } else if (prev1_lvl == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Previous Level',
            //         showConfirmButton: true,
            //     });
            //     $('#prev1_lvl').focus();
            // } else if (sibling2_fname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister2 First Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling2_fname').focus();
            // } else if (sibling2_mname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister Middle Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling2_mname').focus();
            // } else if (sibling2_lname == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Brother/Sister Last Name',
            //         showConfirmButton: true,
            //     });
            //     $('#sibling2_lname').focus();
            // } else if (prev2_lvl == "") {
            //     // alert("Please Enter Gender");
            //     Swal.fire({
            //         icon: 'info',
            //         title: 'Please Enter Previous Levels',
            //         showConfirmButton: true,
            //     });
            //     $('#prev2_lvl').focus();
        } else if ($("#formuploadID").val() == "" || sessionStorage.getItem("isIDUploaded") != "true") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Upload your Photo ID',
                showConfirmButton: true,
            });
            // $('#moth_occu').focus();
        } else if ($("#formuploadPSA").val() == "" || sessionStorage.getItem("isPSAUploaded") != "true") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Upload your PSA Birth Certificate',
                showConfirmButton: true,
            });
            // $('#moth_occu').focus();
        } else if ($("#formuploadCard").val() == "" || sessionStorage.getItem("isCARDUploaded") != "true") {
            // alert("Please Enter Gender");
            Swal.fire({
                icon: 'info',
                title: 'Please Upload your Report Card',
                showConfirmButton: true,
            });
            // $('#moth_occu').focus();
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
                
// console.log("ref_number=" + ref_num + "&fname=" + fname + "&mname=" + mname + "&lname=" + lname + "&dob=" + dob + "&pob=" + pob +
// "&gender=" + gender + "&age=" + age + "&nationality=" + nationality + "&yearlvl=" + yearlvl + "&adds1=" + adds1 + "&adds2=" + adds2 + "&city=" + city + "&state=" + state + "&zipcode=" + zipcode + "&country=" + country +
// "&religion=" + religion + "&contact=" + contact + "&email=" + email + "&school_name=" + school_name + "&school_adds=" + school_adds + "&father_fname=" +
// father_fname + "&father_mname=" + father_mname + "&father_lname=" + father_lname + "&fath_occu=" + fath_occu +
// "&mother_fname=" + mother_fname + "&mother_mname=" + mother_mname + "&mother_lname=" + mother_lname +
// "&moth_occu=" + moth_occu + "&guard_fname=" + guard_fname + "&guard_mname=" + guard_mname + "&guard_lname=" +
// guard_lname + "&relationship=" + relationship

// //For Grade 11 Additional Info
// +
// "&schl_name=" + schl_name + "&schl_adds=" + schl_adds + "&schl_type=" + schl_type +
// "&schl_cont=" + schl_cont + "&strand1=" + strand1 + "&strand2=" + strand2 +
// "&fam_fname1=" + fam_fname1 + "&fam_mname1=" + fam_mname1 + "&fam_lname1=" + fam_lname1 +
// "&fam_relationship1=" + fam_relationship1 + "&batch1=" + batch1 + "&fam_cont1=" + fam_cont1 +
// "&fam_fname2=" + fam_fname2 + "&fam_mname2=" + fam_mname2 + "&fam_lname2=" + fam_lname2 +
// "&fam_relationship2=" + fam_relationship2 + "&batch2=" + batch2 + "&fam_cont2=" + fam_cont2 +
// "&learn_tsc=" + learnTsc + "&sport=" + sport + "&degree=" + degree +

// "&sibling1_fname=" + sibling1_fname + "&sibling1_mname=" +
// sibling1_mname + "&sibling1_lname=" + sibling1_lname + "&prev1_lvl=" + prev1_lvl + "&sibling2_fname=" +
// sibling2_fname + "&sibling2_mname=" + sibling2_mname + "&sibling2_lname=" + sibling2_lname + 
// "&prev2_lvl=" + prev2_lvl);

                if (result.isConfirmed) {
                    $.ajax({
                        url: "online_enrollmentk10.php",
                        type: "POST",
                        data: "ref_number=" + ref_num + "&fname=" + fname + "&mname=" + mname + "&lname=" + lname + "&dob=" + dob + "&pob=" + pob +
                            "&gender=" + gender + "&age=" + age + "&nationality=" + nationality + "&yearlvl=" + yearlvl + "&adds1=" + adds1 + "&adds2=" + adds2 + "&city=" + city + "&state=" + state + "&zipcode=" + zipcode + "&country=" + country +
                            "&religion=" + religion + "&contact=" + contact + "&email=" + email + "&school_name=" + school_name + "&school_adds=" + school_adds + "&father_fname=" +
                            father_fname + "&father_mname=" + father_mname + "&father_lname=" + father_lname + "&fath_occu=" + fath_occu +
                            "&mother_fname=" + mother_fname + "&mother_mname=" + mother_mname + "&mother_lname=" + mother_lname +
                            "&moth_occu=" + moth_occu + "&guard_fname=" + guard_fname + "&guard_mname=" + guard_mname + "&guard_lname=" +
                            guard_lname + "&relationship=" + relationship +
                           "&sibling1_fname=" + sibling1_fname + "&sibling1_mname=" +
                            sibling1_mname + "&sibling1_lname=" + sibling1_lname + "&prev1_lvl=" + prev1_lvl + "&sibling2_fname=" +
                            sibling2_fname + "&sibling2_mname=" + sibling2_mname + "&sibling2_lname=" + sibling2_lname + 
                            "&prev2_lvl=" + prev2_lvl,

                            // //For Grade 11 Additional Info
                            // +
                            // "&schl_name=" + schl_name + "&schl_adds=" + schl_adds + "&schl_type=" + schl_type +
                            // "&schl_cont=" + schl_cont + "&strand1=" + strand1 + "&strand2=" + strand2 +
                            // "&fam_fname1=" + fam_fname1 + "&fam_mname1=" + fam_mname1 + "&fam_lname1=" + fam_lname1 +
                            // "&fam_relationship1=" + fam_relationship1 + "&batch1=" + batch1 + "&fam_cont1=" + fam_cont1 +
                            // "&fam_fname2=" + fam_fname2 + "&fam_mname2=" + fam_mname2 + "&fam_lname2=" + fam_lname2 +
                            // "&fam_relationship2=" + fam_relationship2 + "&batch2=" + batch2 + "&fam_cont2=" + fam_cont2 +
                            // "&learn_tsc=" + learnTsc + "&sport=" + sport + "&degree=" + degree +


                        success: function (data) {
                            console.log(data);
                            if (data == "ok") {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User Succesfully Added!',
                                    showConfirmButton: false,
                                    // timer: 1500
                                });
                                // alert("");
                                $('#ref_number').val("");
                                $('#fname').val("");
                                $('#mname').val("");
                                $('#lname').val("");
                                $('#dob').val("");
                                $('#pob').val("");
                                $('#gender').val("");
                                $('#age').val("");
                                $('#nationality').val("");
                                $('#yearlvl').val("");
                                $('#adds1').val("");
                                $('#adds2').val("");
                                $('#city').val("");
                                $('#state').val("");
                                $('#zipcode').val("");
                                $('#country').val("");
                                $('#religion').val("");
                                $('#contact').val("");
                                $('#email').val("");
                                $('#school_name').val("");
                                $('#school_adds').val("");
                                $('#father_fname').val("");
                                $('#father_mname').val("");
                                $('#father_lname').val("");
                                $('#fath_occu').val("");
                                $('#mother_fname').val("");
                                $('#mother_mname').val("");
                                $('#mother_lname').val("");
                                $('#moth_occu').val("");
                                $('#guard_fname').val("");
                                $('#guard_mname').val("");
                                $('#guard_lname').val("");
                                $('#relationship').val("");
                                $('#sibling1_fname').val("");
                                $('#sibling1_mname').val("");
                                $('#sibling1_lname').val("");
                                $('#prev1_lvl').val("");
                                $('#sibling2_fname').val("");
                                $('#sibling2_lname').val("");
                                $('#prev2_lvl').val("");
                                $('#formuploadID').val("");
                                $('#formuploadPSA').val("");
                                $('#formuploadCard').val("");

//Grade 11 additional info
                                // $('#schl_name').val("");
                                // $('#schl_adds').val("");
                                // $('#schl_cont').val("");
                                // $('#schl_type').val("");
                                // $('#strand1').val("");
                                // $('#strand2').val("");
                                // $('#fam_fname1').val("");
                                // $('#fam_mname1').val("");
                                // $('#fam_lname1').val("");
                                // $('#fam_relationship1').val("");
                                // $('#batch1').val("");
                                // $('#fam_cont1').val("");
                                // $('#fam_fname2').val("");
                                // $('#fam_mname2').val("");
                                // $('#fam_lname2').val("");
                                // $('#fam_relationship2').val("");
                                // $('#batch2').val("");
                                // $('#fam_cont2').val("");

                                //learn_f - FAMILY/FRIENDS
                                //learn_tg - TEACHERS/​GUIDANCE COUNSELORS
                                //learn_co - CAREER ORIENTATIONS
                                //learn_o - OTHERS

                                // $('#learn_f').prop("checked", false);
                                // $('#learn_tg').prop("checked", false);
                                // $('#learn_co').prop("checked", false);
                                // $('#learn_o').prop("checked", false);
                                // $('#sport').val("");
                                // $('#degree').val("");

                                
                            } else if (data == "unset") {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Please upload file first',
                                    showConfirmButton: false,
                                    // timer: 1500
                                });
                            } else {
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