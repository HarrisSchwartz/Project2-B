/**
 *   @author Schwartz, Harris (hfschwartz21@gmail.com)
 *   @version 0.0.1
 *   @summary Project 2-B code || created: 09.29.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const BASE_PRICE = 100;
const AT_FAULT_FEE = 50;
const CURRENT_YEAR = 2016;

let continueResponse;
let policyNum, birthDay, birthMonth, birthYear, customerAge, premiumDueDay, premiumDueMonth, premiumDueYear, numAccidents, totalCost;
let firstName, lastName;
let currentDay, currentMonth;

function main() {
    if (continueResponse == null) {
        setContinueResponse();
    }
    if (continueResponse !== 0 && continueResponse !== 1) {
        console.log(`${continueResponse} is an incorrect value. Please try again.`);
        return setContinueResponse();
    }

    if (continueResponse === 1) {
        setFirstName();
        setLastName();
        setPolicyNum();
        setBirthDay();
        setBirthMonth();
        setBirthYear();
        setCurrentDay();
        setCurrentMonth();
        setNumAccidents();
        setCustomerAge();
        setPremiumDueDay();
        setPremiumDueMonth();
        setPremiumDueYear();
        setTotalCost();
        printTotalCost();
        setContinueResponse();
        return main();
    }
    printGoodbye();
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = Number(PROMPT.question(`\n\tIs this information correct? [0=Yes, complete Transaction; 1=No, Re-enter information]: `));
    } else {
        continueResponse = 1;
    }
}

function setFirstName() {
    process.stdout.write('\x1Bc');
    firstName = PROMPT.question('\nPlease enter your first name: ');
}

function setLastName() {
    lastName = PROMPT.question('\nPlease enter your last name: ')
}

function setPolicyNum() {
    policyNum = Math.floor((Math.random() * 130) + 39);
}

function setBirthDay() {
    birthDay = Number(PROMPT.question('\nPlease enter the day of the month on which you were born: '));
    if (birthDay < 1 || birthDay > 31) {
        console.log(`${birthDay} is an incorrect value. Please try again.`);
        return setBirthDay();
    }
}

function setBirthMonth() {
    birthMonth = Number(PROMPT.question('\nPlease enter the number of the month you were born: '));
    if (birthMonth < 1 || birthMonth > 12) {
        console.log(`${birthMonth} is an incorrect value. Please try again.`);
        return setBirthMonth();
    }
}

function setBirthYear() {
    birthYear = Number(PROMPT.question('\nPlease enter the year you were born: '));
    if (birthYear < 1916 || birthYear > 2016) {
        console.log(`${birthYear} is an incorrect value. Please try again.`);
        return setBirthYear();
    }
}

function setNumAccidents() {
    numAccidents = Number(PROMPT.question('\nHow many at-fault collisions have you been a part of in the last three years: '));
    if (numAccidents < 0 || numAccidents > 9) {
        console.log(`${numAccidents} is an incorrect value. Please try again.`);
        return setNumAccidents();
    }
}

function setCurrentDay() {
    currentDay = Number(PROMPT.question('\nWhat is the day of the month today? '));
    if (currentDay < 1 || currentDay > 31) {
        console.log(`${currentDay} is an incorrect value. Please try again.`);
        return setCurrentDay();
    }
}

function setCurrentMonth() {
    currentMonth = Number(PROMPT.question('\nWhat is the current month (number)? '));
    if (currentMonth < 1 || currentMonth > 12) {
        console.log(`${currentMonth} is an incorrect value. Please try again.`);
        return setCurrentMonth();
    }
}

function setCustomerAge() {
    if (currentDay >= birthDay && currentMonth >= birthMonth || currentDay < birthDay && currentMonth > birthMonth) {
        customerAge = CURRENT_YEAR - birthYear;
    } else if (currentDay < birthDay && currentMonth < birthMonth || currentDay > birthDay && currentMonth < birthMonth) {
        customerAge = CURRENT_YEAR - 1 - birthYear;
    }
}

function setPremiumDueDay() {
    premiumDueDay = Number(currentDay);
}

function setPremiumDueMonth() {
    premiumDueMonth = Number(currentMonth + 1);
}

function setPremiumDueYear() {
    premiumDueYear = Number(CURRENT_YEAR);
}

function setTotalCost() {
    totalCost = 0;
    const YOUNG_PERSON_FEE = 20,
        MEDIUM_PERSON_FEE = 10,
        OLD_PERSON_FEE = 30,
        YOUNG_PERSON_AGE = 30,
        MEDIUM_PERSON_AGE = 60,
        OLD_PERSON_AGE = 999;
    if (customerAge > 15) {
        if (customerAge > 15 && customerAge < YOUNG_PERSON_AGE) {
            totalCost = YOUNG_PERSON_FEE + BASE_PRICE + AT_FAULT_FEE * numAccidents;
        } else if (customerAge > YOUNG_PERSON_AGE && customerAge < MEDIUM_PERSON_AGE) {
            totalCost = MEDIUM_PERSON_FEE + BASE_PRICE + AT_FAULT_FEE * numAccidents;
        } else if (customerAge > MEDIUM_PERSON_AGE && customerAge < OLD_PERSON_AGE) {
            totalCost = OLD_PERSON_FEE + BASE_PRICE + AT_FAULT_FEE * numAccidents;
        }
    }
}

function printTotalCost() {
    console.log(`\n\t${firstName} ${lastName}'s bill: \$${totalCost}. Policy number: ${policyNum}\n\tYour premium is due on ${premiumDueMonth}/${premiumDueDay}/${premiumDueYear}`);
}

function printGoodbye() {
    process.stdout.write('\x1Bc');
    console.log('\nThank you for your purchase.');
}