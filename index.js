
const numberClick=document.querySelectorAll('.number');
const operatorClick=document.querySelectorAll('.operation');
const utilityClick=document.querySelectorAll('.utility');
const clear=document.getElementById('clear');
const backspace=document.getElementById('backspace-img');
const calc_display=document.getElementById('calculation-holder');



var calculationString = '';
var lastInput=[] ;
var bracketCount = 0;
var dotAdded = false;
numberClick.forEach((number) => {
    number.addEventListener('click', (e) => {
        let val= e.target.innerText;  
        if(calculationString.length < 30) {  
            if(lastInput.length > 0 && lastInput.at(-1).id.includes("bracket") && lastInput.at(-2).id !== "bracket") {//smart innit?
                val="*"+val; // If the last input was a bracket, add a multiplication sign before the number
            }
            calculationString += val;
            calc_display.innerText = calculationString;
            lastInput.push(e.target);
            console.log("number clicked: " + e.target.innerText );
        }
        else{
            alert("Calculation string is too long, please clear the calculator.");
            console.error("Calculation string is too long, please clear the calculator.");
        }
    });
});
backspace.addEventListener('click',(e) =>{
    if(calculationString.length >0){
        calculationString=calculationString.slice(0,-1);
        calc_display.innerText=calculationString;
        if(lastInput.at(-1).id.includes("decimal")) {
            dotAdded = false; // Reset dotAdded if the last character is a number and no dot exists
        }
        else if(lastInput.at(-1).id.includes("bracket")) {
            bracketCount-=0.5;
        }
        lastInput.pop(); // Remove the last input from lastInput array
    }
});
operatorClick.forEach((operator)=>{
    operator.addEventListener('click', (e) => {
        if(calculationString.length >30){
            alert("Calculation string is too long, please clear the calculator.");
            console.error("Calculation string is too long, please clear the calculator.");
            return; // Prevent further processing if the string is too long
        }
        else if(operator.id!=="equal"){
            if(lastInput.at(-1).className.includes("operation")){
                calculationString = calculationString.slice(0, -1); // Remove last operator
                calculationString += e.target.innerText; // Add new operator
                calc_display.innerText = calculationString;
                lastInput.pop(); // Remove the last operator from lastInput
                lastInput.push(e.target); // Update lastInput to the new operator
                dotAdded = false; // Reset dotAdded when an operator is clicked
            }
            else if((lastInput.at(-1).className.includes("number") || (bracketCount===0)) && !lastInput.at(-1).id.includes("plus_minus")) {
                lastInput.push(e.target);
                calculationString += e.target.innerText;
                calc_display.innerText = calculationString;
                dotAdded = false; // Reset dotAdded when an operator is clicked
            }

            
        }
        else{
            do_calculation(calculationString);
        }
    });
});
utilityClick.forEach((utility) => {
    utility.addEventListener('click',(e)=> {
        if(calculationString.length >30){
            alert("Calculation string is too long, please clear the calculator.");
            console.error("Calculation string is too long, please clear the calculator.");
            return; // Prevent further processing if the string is too long
        }
        else if(e.target.id.includes('decimal') && !dotAdded) {
            console.log("decimal clicked");
            if(lastInput.at(-1).className.includes("number")) {
                calculationString += e.target.innerText;
                calc_display.innerText = calculationString;
                dotAdded = true; // Set dotAdded to true when a decimal is added
                lastInput.push(e.target);
                console.log("decimal added");
            }
            
        }
        else if(e.target.id.includes('bracket')) {
            if(lastInput.length !==0 && (lastInput.at(-1).className.includes("number") || lastInput.at(-1).className.includes("operation"))) {
                if(lastInput.at(-1).className.includes("number") && bracketCount > 0) {
                    console.log("closing bracket clicked");
                    calculationString += ')';
                    bracketCount -= 1;
                }
                else if(lastInput.at(-1).className.includes("number") && bracketCount === 0) {
                    console.log(bracketCount);
                    calculationString += '*(';
                    bracketCount += 1;
                    lastInput.push(e.target);
                }
                else if(lastInput.at(-1).id.includes("bracket") && bracketCount > 0) {
                    console.log("closing bracket clicked");
                    calculationString += ')';
                    bracketCount -= 1;
                }
                else {
                    calculationString += '(';
                    bracketCount += 1;
                }
                calc_display.innerText = calculationString;            
                lastInput.push(e.target);
            }
            else if(lastInput.length ===0){
                console.log("opening bracket clicked");
                calculationString += '(';
                bracketCount += 1;
                calc_display.innerText = calculationString;            
                lastInput.push(e.target);
            }          
        }
        else if(e.target.id.includes("plus_minus")){
            if(lastInput.at(-1).className.includes("number")) {
                calculationString +='*(-';
                bracketCount += 1; // Adjust bracket count for plus/minus operation
                lastInput.push(e.target);
            }
            else{
                calculationString +='(-';
                bracketCount += 1; // Adjust bracket count for plus/minus operation
            }
            bracketCount += 1;
            calc_display.innerText = calculationString;
            console.log("plus minus clicked");
            lastInput.push(e.target);
            lastInput.push(e.target);
            
        }
        calc_display.innerText = calculationString;
    });//event listener cloing
});
clear.addEventListener('click', () => {
    calculationString = '';
    calc_display.innerText = calculationString;
    lastInput = [];
    bracketCount = 0;
    dotAdded = false; // Reset dotAdded when clearing the calculator
    console.log("Calculator cleared");
});
calc_display.addEventListener('click', () => {
    console.log("Calculation string: " + calculationString);
});
function do_calculation(calculationString) {
    let calc3 = calculationString;
    let brack3 = bracketCount;
    while(brack3 > 0) {
        calc3 += ')'; // Close any unclosed brackets
        brack3 -= 1;
    }
    //i know i could have used the maths.js evaluation function that is easier and safer, but needed this to also handle the plain eval edge cases. No edge case is for the weak.(just kidding, please use maths.js in production)
    let result= eval(calculationString);
    let res_cont= document.getElementById('result-holder');
    res_cont.innerText = result;
    
}
const detectChanges=new MutationObserver((mutations, detectChanges)=>{
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            console.log("changes to calculation string detected");
            try {
                let calc2=calculationString;
                let brack2=bracketCount;
                console.log("bracket count: " + brack2);
                while(brack2 > 0) {
                    calc2 += ')'; // Close any unclosed brackets
                    brack2 -= 1;
                    
                }
                console.log("Performing calculation: " + calc2);
                do_calculation(calc2);
            }
            catch (error) {
                console.error("Error in calculation:  AUTO");
                let res_cont = document.getElementById('result-holder');
                res_cont.innerText = "";
            }
        }
    });
});
detectChanges.observe(calc_display, {
    childList: true
});
