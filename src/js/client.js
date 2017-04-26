$(init);

function init(){
  console.log('hello world');
  $('#search').on('click', function(){
    const postCode = $('#postcode').val();
    $('#postcode').text(postCode);
  });
}
