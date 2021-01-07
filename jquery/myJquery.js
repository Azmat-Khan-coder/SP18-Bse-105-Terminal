$(document).ready(function(){
  
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
     
      // Now highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });
      
    }).on('mouseout', function(){
      $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
      });
    });
    
    
    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('li.star');
      
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
      
      // JUST RESPONSE (Not needed)
      var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
      var msg = "";
      if (ratingValue > 1) {
          msg = "Thanks! You rated this " + ratingValue + " stars.";
      }
      else {
          msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
      }
      responseMessage(msg);
      
    });
    
    
  });
  
  
  function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }
// $(function(){
//     loadProducts();
//     $("#addProduct").click(addProduct());
// });
//
//
function loadProducts(){
    $.ajax({
        url:"http://apifinalexam.herokuapp.com/api/products",
        method: "GET",
        success: function(response){
            console.log(response);
            var products= $("#productsApi");
            products.empty();
            for(var i = 0; i < response.length; i++){
                var res = response[i];
                products.append(`<div class="col-md-3 col-sm-12">
                <div class="card" style="width: 15rem;">
                   <img src="${res.prImage}" class="card-img-top" alt="...">
                   <div class="card-body">
                      <h5 class="card-title text-center text-primary">${res.prName}</h5>
                      <h6 class="card-title text-center text-dark font-weight-bolder">${res.prPrice}</h6>
                      <ul class="d-flex justify-content-center pr-5 w-100">
                         <li class="clippath-star"></li>
                         <li class="clippath-star"></li>
                         <li class="clippath-star"></li>
                         <li class="clippath-star"></li>
                         <li class="clippath-star"></li>
                      </ul>
                      <div class="d-flex justify-content-center">
                         <a href="#" class="btn btn-dark text-center">Add to Cart</a>
                      </div>
                   </div>
                </div>
             </div>`);
            }
        }
    });

function addProduct(){
    var prName = $("#prName").val();
    var prCategory = $("#prCategory").val();
    var prPrice = $("#prPrice").val();
    var prDetails = $("#prDetails").val();
    var prImage = $("#prImage").val();
    $.ajax({
        url: "http://apifinalexam.herokuapp.com/api/products/add",
        method: "POST",
        data: {prName, prCategory, prPrice, prDetails, prtImage },
        success: function(response){
            console.log(response);
            loadRecipies();
        }
        });
    }

    
}