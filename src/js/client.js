$(init);

function init(){
  console.log('hello world');
  propertiesSearch();
}

function propertiesSearch(){
  $('#submit').on('click', function() {
    const search = $('#search').val();
    console.log(search);
    $('#search').val('');
  });
}
