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
