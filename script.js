$(document).ready(function(){
  var zoek;
  $('#Halen').click(function() {
    zoek = $('#zoeken').val();
    haal();
  });
  $('#zoeken').keydown(function(e) {
    if(e.keyCode == 13) {
      zoek = $(this).val();
      haal();
    }
  });

  function haal() {
    var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" +
    zoek + "&jsoncallback=?"
    $.ajax (
      {
        dataType: 'json',
        method: 'GET',
        url: flickrURL,
        success: verwerk
      }
    )
  }

  function verwerk(data){
    console.log(data);
    $('#fotos').html("");
    for(var i=0; i<data.items.length; i++){
      var foto = data.items[i];
      var htmlCode = "<div class='houder'><div class='afbeelding'><a href='" + foto.link + "' target='_blank'><img src'" + foto.media.m + "' alt='" + foto.title + "' ></a><h4>" + foto.title + "</h4>";
      $('#fotos').append(htmlCode);
    }
    $('#bron a').attr("href", data.link).text(data.title + " door Flickr.com");
  }
})
