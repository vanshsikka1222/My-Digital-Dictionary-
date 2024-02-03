//JavaScript Code
//Dictionary API: BASE URL without our Endpoint (which is word to search)..!!
const Base_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

//Search Button
let btn = document.querySelector("#searchBtn");

let ans = document.querySelector("#ans");
//Error Image (Gif)
let errorImg = document.querySelector(".myImg");
//Audio to Play
let audio = document.querySelector("#audio");
//Audio Button
let audioBtn = document.querySelector(".audio");

//Adding event listener on Search Button Click
btn.addEventListener("click", async () => {
    let enteredWord = document.querySelector("#word").value;
    //Fetch API by adding our Endpoint
    await fetch(`${Base_URL}/${enteredWord}`)
        //response is converted to json using 'response.json()'
        .then((response) => response.json())
        //The JSON data is then used to extract various pieces of information related to the entered word. 
        .then((data) => {
            let meaning1 = data[0].meanings[0].partOfSpeech;
            let meaning2 = data[0].phonetic;
            let mainMeaning = data[0].meanings[0].definitions[0].definition;
            let sound1 = data[0].phonetics[0].audio;

            ans.innerHTML = `
            <div class="word">
            <h1>${enteredWord}</h1>
            <button onclick="audio.play()" class="audio" id="audioBtn">
            <i class="fas fa-volume-up"></i>
            </button>
            </div>

            <div class="moreDetails">
            <p>${meaning1}</p>
            <p>${meaning2}</p>
            </div>

            <p class="word-meaning">${mainMeaning}</p>`;
            audio.setAttribute("src", `${sound1}`);
            errorImg.src = "./resources/dictionaryImg.gif";
        })
        .catch(() => {
            if (enteredWord === "") {
                ans.innerHTML = `<h4>Please enter the word..!!</h4>`;
                errorImg.src = "./resources/dictionaryErrorImg.gif";
                errorImg.classList.add("errorImg");
            } else {
                errorImg.src = "./resources/dictionaryErrorImg.gif";
                errorImg.classList.add("errorImg");
                ans.innerHTML = `<h3 class="word-error">Couldn't find the word..!!</h3>`;
            }
        });
});

/*
fas: This class is part of Font Awesome and stands for "Font Awesome Solid." It is used to specify that you want to use the solid version of the icon.

fa-volume-up: This class represents the specific icon you want to display. In this case, it's the "volume up" icon.
*/

