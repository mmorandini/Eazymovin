$(init);

function init(){
  console.log('hello world');
  propertiesSearch();
}

function propertiesSearch(req, res){

  $('#search').on('click', function(){
    console.log(req.body, res.body);
  });
}


// $('#search').on('click', function() {
//   const postcode = $('#postcode').val();
//   const minPrice = $('#min-price').val();
//   const maxPrice = $('#max-price').val();
//   const bedrooms = $('#bedrooms').val();
//   const livingRoom = $('#living-room').val();
//   console.log(postcode, minPrice, maxPrice, bedrooms, livingRoom);
//   $('#search').val('');
// });
