$(function(){
    loadProducts();
    $("#addProduct").click(addProduct());
});
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