// const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// for (code in countryList){
//     console.log(code,countryList[code]);
// }

const updateExchangeRate = async () =>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval === "" || amtval < 1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // console.log(response);

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurrency}.json`;
    let response = await fetch(URL);
    //console.log(response);
    // let data=await response.json();
    // let rate=data[toCurrency.value.toLowerCase()];
    // console.log(data);


    if (response.ok) {
        let json = await response.json();
        console.log('JSON Response:', json); // Log the entire JSON response
        let rate = json[fromCurrency][toCurrency];
        if (rate !== undefined) {
            console.log('Exchange Rate:', rate);
            let finalAmount = amtval * rate;
            msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


           
        } else {
            console.error('Exchange rate not found for the specified currencies.');
        }
    } else {
        console.error('Error fetching data:', response.status, response.statusText);
    }
    

   
};

for(let select of dropdowns){
    
        for (currCode in countryList){
            let newOption=document.createElement("option");
            newOption.innerText=currCode;
            newOption.value=currCode;
            if(select.name === "from" && currCode === "USD"){
                newOption.selected="selected";
            }
            else if(select.name === "to" && currCode === "INR"){
                newOption.selected="selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);

        });
    
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(countryCode)
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
 
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();


});

window.addEventListener("load", () => {
    updateExchangeRate();
  });