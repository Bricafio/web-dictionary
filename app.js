/*---Palet-icon changer--*/
let checked = false;
let temp;

document.getElementById("checkBox").addEventListener("change", () => {
    const iconPalet = document.getElementById("iconPalet");
    checked = !checked;
    if (checked == true) iconPalet.textContent = '☼';
    else iconPalet.textContent = '☾';
})

/*---Dictionary content---*/
const form = document.getElementById("form");
const inputText = document.getElementById("inputText");
const word = document.getElementById("dictionaryWord");
const phonetics = document.getElementById("dictionaryPhonetics");
const audio = document.getElementById("audioSource");
const dictionaryButton = document.getElementById("dictionaryButton");

const nounList = document.getElementById("nounList");
const synonyms = document.getElementById("synonyms");

const verbList = document.getElementById("verbList");
const link = document.getElementById("link");

form.addEventListener("submit", function(event){
    event.preventDefault();
    try {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText.value}`) 
            .then(res => res.json())
            .then(response => {
            word.textContent = response[0].word;
            phonetics.textContent = "";
            dictionaryButton.setAttribute("hidden", "");

            if (response[0].phonetics != "") {
                for (let i = 0; i < response[0].phonetics.length; i++) {
                    if (phonetics.textContent == "") {
                        phonetics.textContent = response[0].phonetics[i].text != ""? response[0].phonetics[i].text : "";
                    }
                    if (dictionaryButton.getAttribute("hidden") == ""){
                        if (response[0].phonetics[i].audio != ""){
                            audio.src = response[0].phonetics[i].audio;
                            dictionaryButton.removeAttribute("hidden");
                        }
                    }
                }
            } 

            link.textContent = `https://en.wiktionary.org/wiki/${inputText.value}`;
            link.setAttribute("href", `https://en.wiktionary.org/wiki/${inputText.value}`);

            nounList.innerHTML = '';

            response[0].meanings[0].definitions.forEach(element => {
                const li = document.createElement('li');
                li.textContent = element.definition;
                li.classList.add("dictionary__meaning--item");
                nounList.appendChild(li);
            })

            if (response[0].meanings[0].synonyms != "") {
                response[0].meanings[0].synonyms.forEach(element => {
                    synonyms.textContent = element;
                })
            } else synonyms.textContent = "";

            verbList.innerHTML = '';
            response[0].meanings[1].definitions.forEach(element => {
                const li = document.createElement('li');
                li.classList.add("dictionary__meaning--item");
                li.textContent = element.definition;
                
                const p = document.createElement('p');
                p.classList.add("dictionary__meaning--example");

                p.textContent = (element.example !== undefined? '"' +  element.example + '"' : element.example);

                verbList.appendChild(li);
                verbList.appendChild(p);
            })
        })
    } catch (error){
    };
});

dictionaryButton.addEventListener("click", () => {
    audio.play();
})

/*---Font changer---*/
const fontBtn = document.getElementById("textFontButton");
const fontBtn1 = document.getElementById("font-GillSans");
const fontBtn2 = document.getElementById("font-TimesNewRoman");
const fontBtn3 = document.getElementById("font-Verdana");
const fontBtn4 = document.getElementById("font-SegoeUI");
const r = document.querySelector(":root");

const fontList = document.getElementById("textFontList");
let fontClicked = false;

fontBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    fontClicked = !fontClicked;
    if (fontClicked == true) {
        fontList.style.visibility = 'visible';
    } else fontList.style.visibility = 'hidden';
}) 

fontBtn1.addEventListener("click", () => {
    temp = fontBtn.textContent;
    fontBtn.textContent = fontBtn1.textContent;
    fontBtn1.textContent = temp;
    r.style.setProperty("--font", fontBtn.textContent);
})

fontBtn2.addEventListener("click", () => {
    temp = fontBtn.textContent;
    fontBtn.textContent = fontBtn2.textContent;
    fontBtn2.textContent = temp;
    r.style.setProperty("--font", fontBtn.textContent);
})

fontBtn3.addEventListener("click", () => {
    temp = fontBtn.textContent;
    fontBtn.textContent = fontBtn3.textContent;
    fontBtn3.textContent = temp;
    r.style.setProperty("--font", fontBtn.textContent);
})

fontBtn4.addEventListener("click", () => {
    temp = fontBtn.textContent;
    fontBtn.textContent = fontBtn4.textContent;
    fontBtn4.textContent = temp;
    r.style.setProperty("--font", fontBtn.textContent);
})

document.addEventListener("click", function(event){
    if (!fontBtn.contains(event.target)) {
        fontClicked = false;
        fontList.style.visibility = 'hidden';
    }
})

