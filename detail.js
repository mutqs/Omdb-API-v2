const apiKey = "ecfee61f";
const baseUrl = "http://www.omdbapi.com/?apikey=" + apiKey;
const imdbID = window.location.search.replace('?', '');

let name, filmDetails, nameList, year, poster;


async function GetData() {
    if (name === "") {
        alert("Film adı girilmesi zorunludur")
        return
    }

    const url = `${baseUrl}&i=${imdbID}`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("detail").innerHTML = 
    `   <div class="card" style="text-align: center;">
        <div class="card-header bg-dark text-light">Title: ${data.Title} - Year: ${data.Year}</div>
        <div class="card-header bg-secondary">Director: ${data.Director} </div> 
        <div class="card-header bg-dark text-light">
         <img src="${data.Poster}" >
          </div>
         <div class="card-header bg-secondary">Writer: ${data.Writer}</div>
        <div class="card-header bg-dark text-light">IMDb Rating: ${data.imdbRating} - IMDb Votes: ${data.imdbVotes} </div>
        <div class="card-header bg-secondary">Genre: ${data.Genre} - Runtime: ${data.Runtime} </div>
        <div class="card-header bg-dark text-light">Plot: ${data.Plot}</div>  
        </div>
    `

    console.log(data);

}
GetData();