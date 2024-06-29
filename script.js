const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropDowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

let updateFlag = (element) => {  //element = select
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amt.value = 1;
    }

    const Url = `${Base_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(Url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(response);

})
