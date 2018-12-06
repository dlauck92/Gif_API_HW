$(document).ready(function(){
    var animals = ["wolf", "doggo", "danger noodle", "trash panda", "sea dog"];

    // diplay btn function
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < animals.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-animal", animals[i]);
            gifButton.text(animals[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    // add new btn when user enters selection
    function addNewButton(){
            $("#addGif").on("click", function(){
            var animal = $("#animal-input").val().trim();
            if (animal == ""){
              return false; // prevents user from adding blank btn
            }
            animals.push(animal);
        
            displayGifButtons();
            return false;
        });
    }

    // remove most recently added btn
    function removeLastButton() {
        $("#removeGif").on("click", function(){
            animals.pop();
            displayGifButtons();
            return false;
        });
    }
    
    // display gifs
    function displayGifs() {
        var animal = $(this).attr("data-animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function(response) {
            console.log(response);
            $("#gifsView").empty();
            var results = response.data; // display result

            if (results == ""){
              alert("No results for your selection. Try again!");
            }

            for (var i = 0; i < results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");

                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }

    // call functions
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".animal", displayGifs);
    $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});