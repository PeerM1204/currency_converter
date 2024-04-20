#! /usr/bin/env node
import inquirer from "inquirer";
//Currency converter API Link:
let apiLink = "https://v6.exchangerate-api.com/v6/1b3255cd918fdaf8db1f5136/latest/PKR";
//Data Fectching:
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
//Object to Array:
let countries = Object.keys(data);
//User Input First Country:
let firstCuntry = await inquirer.prompt([
    {
        name: 'name',
        message: 'Converting From',
        type: 'list',
        choices: countries,
    }
]);
// console.log(`Converting from ${firstCuntry.name}`);
//First Country Money:
let userMoney = await inquirer.prompt([
    {
        name: 'rupee',
        type: 'number',
        message: `Please Enter the Amount in ${firstCuntry.name}`
    }
]);
//Convert Country:
let secondCuntry = await inquirer.prompt([
    {
        name: 'name',
        message: 'Converting To',
        type: 'list',
        choices: countries,
    }
]);
//Conversion Rate:
let cnvRate = `https://v6.exchangerate-api.com/v6/1b3255cd918fdaf8db1f5136/pair/${firstCuntry.name}/${secondCuntry.name}`;
//fetching Data for Conversion Rate:
let cnvRateData = async (data) => {
    let cnvRateData = await fetch(data);
    let res = await cnvRateData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvRateData(cnvRate);
// console.log(cnversionRate);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${firstCuntry.name}  ${userMoney.rupee}in ${secondCuntry.name} is ${convertedRate}`);
//list of currency exchange rate:
// let exchangeRate:any = {
//     "USD":1,
//     "YEN":113,
//     "CAD":1.69,
//     "AUD":1.65,
//     "PKR":280
// }
// //prom[pt the user:
// let answer = await inquirer.prompt([
//     {
//        name:'currencyFrom',
//        type:'list',
//        message:"Select the Currency convert from:",
//        choices:['USD','YEN','CAD','AUD','PKR']
//     },
//     //currency to:
//     {
//         name:'currencyTo',
//         type:'list',
//         message:'Select the currency convert into:',
//         choices:['USD','YEN','CAD','AUD','PKR']
//     },
//     {
//         name:'amount',
//         message:'Enter thr amount to convert:',
//         type:'input'
//     }
// ]);
// let fromAmount = exchangeRate [answer.currencyFrom];
// let toAmount= exchangeRate [answer.currencyTo];
// let amount = answer.amount
// //formula:
// let baseAmount = amount / fromAmount;
// let convertedAmount = baseAmount * toAmount;
// console.log(convertedAmount.toFixed(2));
