function fetchMovieDetails() { // this function is called when the user searches for a movie//
    const movieName = document.getElementById('movieName').value; //This line gets what the user typed in the movie name box.
    const errorMessage = document.getElementById('errorMessage'); //These two lines store references to HTML elements//
    const movieDetails = document.getElementById('movieDetails');


    errorMessage.textContent = ''; //Removes any earlier error messages//
    movieDetails.innerHTML = ''; //Clears previous movie details//

    if (!movieName) {  //this checks if movieName is empty 
        errorMessage.textContent = 'Please enter a movie name.'; //If nothing was typed, it shows an error message and stops the function using return.
        return;
    }

    
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=20fa1222`) //Makes an API call to the OMDb API, using the movie name the user typed.//
        .then(response => response.json()) //converts the  response from the API into JSON format (so we can use it in JavaScript).
        .then(data => { //Once we get the data in JSON we can use it as data.
            if (data.Response === 'False') { //Checks if the API says the movie was not found
                errorMessage.textContent = 'Movie not found. Please try another name.';
                return;
            }

    
            movieDetails.innerHTML = ` 
                <h2>${data.Title}</h2>
                <p><strong>Release Year:</strong> ${data.Year}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <img src="${data.Poster}" alt="${data.Title} Poster">
            `;
        })
        .catch(() => {
            errorMessage.textContent = 'An error occurred. Please try again later.';
        });
}

   
  document.getElementById('movieName').addEventListener('keydown', function(event) {    // search when Enter is pressed
    if (event.key === 'Enter') {
        fetchMovieDetails();
    }
   });