/* eslint-env es6 */
/* eslint-disable */

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 60);
});

const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

const link = "https://spreadsheets.google.com/feeds/list/1SbC39QCEhGXAiTay_iISo9lOUP8dYm2wRgdqh7HpPag/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);


function getData() {
    fetch("https://spreadsheets.google.com/feeds/list/1fQjUIAIEB98DGih-JanUjNW_tEcJaNygxNDd4qtAElU/od6/public/values?alt=json")
        .then(res => res.json())
        .then(handleData);
}

//CREATE TEMPLATE `---- wtf???



function handleData(data) {
    const myData = data.feed.entry;
    console.log("myData - console");
    console.log(myData);
    myData.forEach(function (oneCat) {

        //NAV
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat.gsx$category.$t}`);
        document.querySelector(".top-ul>ul>li").appendChild(a);
        a.textContent = oneCat.gsx$category.$t;

        const section = document.createElement("section");


        const h2 = document.createElement("h2");
        h2.textContent = oneCat.gsx$category.$t;
        section.appendChild(h2);

        const div = document.createElement('div');
        div.id = oneCat.gsx$category.$t;
        div.classList.add("grid-display");
        section.appendChild(div);

        document.querySelector(".test").appendChild(section);



    });
    getProducts()
    //showData();
}



function getProducts() {
    fetch(link)
        .then(res => res.json())
        .then(showData);
    //    .then(function (response){
    //        return response.json();
    //    })
    //    .then(function (data){
    //        showData(data);
    //    })
}

function showData(data) {
    const allData = data.feed.entry;
    console.log("allData - console");
    console.log(allData);
    allData.forEach(function (singleRowData) {
        const template = document.querySelector("#destinationTemplate").content;
        const clone = template.cloneNode(true);
        clone.querySelector("h4").textContent = singleRowData.gsx$name.$t;
        cImg = ('assets/img/' + singleRowData.gsx$imgpath.$t + '.jpg');
        console.log(cImg);
        clone.querySelector(".image").setAttribute('src', cImg);

        clone.querySelector(".image").addEventListener("click", () => {
                console.log("click", singleRowData)
                fetch(link)
                    .then(res => res.json())
                    .then(function (data){

                              modal.querySelector(".modal-image").src = ('assets/img/' + singleRowData.gsx$imgpath.$t + '.jpg');
                              modal.querySelector(".modal-name").textContent = singleRowData.gsx$name.$t;
                              modal.querySelector(".modal-description").textContent = singleRowData.gsx$shortdescription.$t;
                              modal.querySelector(".modal-button span").textContent = singleRowData.gsx$name.$t;
                              modal.querySelector(".modal-price span").textContent = singleRowData.gsx$price.$t;

                          modal.classList.remove("hide");
                });

              });

        console.log(`#${singleRowData.gsx$category.$t}`);
        document.querySelector(`#${singleRowData.gsx$category.$t}`).appendChild(clone);
    });
}



//nav


$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

