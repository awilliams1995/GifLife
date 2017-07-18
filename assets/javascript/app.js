
  var movies = ["Bill Clinton","Donald Trump","Barack Obama", "Gerald Ford","Warren Harding","Abraham Lincoln",    
   "Zachary Taylor","Andrew Jackson","George Washington","John Adams","James Madison","James Monroe","John Quincy Adams","Andrew Jackson","Martin Van Buren","William Henry Harrison","Chester A. Arthur","Franklin D. Roosevelt","John F. Kennedy","Gerald R. Ford","Jimmy Carter","Ronald Reagan","George W. Bush"];

      function chooseMovies(name){
      $("#buttons").append($("<button>").attr({
        class: "btn-primary",
        type:"submit",
        value: name}).text(name));
      };
        movies.forEach(function(x){chooseMovies(x)});     
    $("#add-gif").on("click", function(event) {
         event.preventDefault();
        chooseMovies($("#gif-input").val().trim());
      });

    $("body").on("click",".gifToClick", function() {
      if($(this).data("state") == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state","animated");
      }else{
        $(this).attr("src", $(this).data("still"));
        $(this).data("state","still");
      }
    });

    $("body").on("click",".btn-primary", function() {
      $("#gifLife").empty();
      var person = $(this).attr("value");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>").css({"display":"inline-block","margin-right":"40px"});
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.attr({
                    "class":"gifToClick",
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still"
            });
            gifDiv.append(p).append(personImage);
            $("#gifLife").prepend(gifDiv);
          }
        });
    });
