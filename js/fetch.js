	$(document).ready(function(){
 
 $('#txtsearch').keyup(function(){
  var keyword = $('#txtsearch').val();
		// console.log(keyword);
		$.ajax({
		   url:"searchmem.php",
		   method:"POST",
		   data:"keyword="+keyword,
		   success:function(data)
		   {
			// console.log(data);
			$('#Result').html(data);
		   }
		  });
  
 });
 
 
 $('#refresh').click(function(){
	 window.location="table.php";
	 
	 
 });
});