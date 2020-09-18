const apiKey = "ecfee61f";
const baseUrl = "http://www.omdbapi.com/?apikey=" + apiKey;

let name, filmDetails, nameList, year, poster;




async function GetData() {

    if (localStorage.length === 0) {

        // clear container content
        document.querySelector("#filmBody").innerHTML = "";
        // describe variables
        const nameSelector = document.getElementById("movieName");
        const yearSelector = document.getElementById("movieYear");
        const name = nameSelector.value;
        const year = yearSelector.value;

        if (name === "") {
            alert("Film adı girilmesi zorunludur")
            return
        }

        const url = `${baseUrl}&s=${name}&y=${year}`;

        const response = await fetch(url);
        const data = await response.json();

        // localStorage.setItem('filmler', JSON.stringify(data));
        localStorage.filmler = JSON.stringify(data);
        // console.log(localStorage);

        filmDetails = data.Search;

        filmDetails.filter((item) => {
            document.querySelector("#filmBody").innerHTML +=
                `  <div class="container my-1" style="max-width: 400px;">
            <div class="card " style="text-align: center; " >
                <div class="card-header bg-dark" style="color: white;">${item.Title}</div>
                <div class="card-body"> <img src="${item.Poster}">  </div>
                <div class="card-footer bg-dark" style="color: white;">Year : ${item.Year} </div>
                <div class="card-footer d-flex justify-content-around">
                    <a href="detail.html?${item.imdbID}" class="btn btn-dark">Details</a>
                    <button class="btn btn-danger" > Delete </button>
                </div>
                <hr style="color:black"/>
            </div>
            
   </div>
        `
            // console.log(item);
        })



        nameSelector.value = "";
        yearSelector.value = "";

    }
    else {
        alert("Lütfen local storage'ı temizleyiniz")
        return
    }
}


window.addEventListener("click", function (e) {

    if (e.target.className === "btn btn-danger") {

        const parentTitle = e.target.parentElement.parentElement.firstElementChild.textContent.trim();



        let filmler = JSON.parse(localStorage.getItem("filmler")).Search;


        let movies = filmler.filter(function (item) {
            if (item.Title.trim() !== parentTitle) {
                return item ;
            }
            


        })

        localStorage.setItem("filmler", JSON.stringify(movies));
        // console.log(parentTitle);
        // // console.log(item.Title);
        // console.log(filmler);
        return
    }


})




document.addEventListener("DOMContentLoaded", function () {

    let film = JSON.parse(localStorage.getItem("filmler"));

    // console.log(film);

    filmDetailsLoaded = film.Search

    filmDetailsLoaded.filter((item) => {

        debugger

        document.querySelector("#filmBody").innerHTML +=
            `  <div class="container my-1" style="max-width: 400px;">
        <div class="card " style="text-align: center; " >
            <div class="card-header bg-dark" style="color: white;">${item.Title}</div>
            <div class="card-body"> <img src="${item.Poster}">  </div>
            <div class="card-footer bg-dark" style="color: white;"> Year : ${item.Year} </div>
            <div class="card-footer d-flex justify-content-around">
                <a href="detail.html?${item.imdbID}" class="btn btn-dark">Details</a>
                <button class="btn btn-danger" > Delete </button>
            </div>
        </div>
        <hr style="color:black"/>
</div>
    ` })



})

window.addEventListener("click", function (e) {


    if (e.target.className === "btn btn-danger") {
        e.target.parentElement.parentElement.remove();
    }


});







function ClearLocal() {
    if (localStorage.length != 0) {

        localStorage.removeItem("filmler");

        const filmItems = document.querySelector("#filmBody");

        while (filmItems.firstElementChild !== null) {
            filmItems.firstElementChild.remove();
        }

    }
}




