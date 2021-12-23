function updateLowerDisplay(){
    if(operation == ''){
        lowerResult = first.toLocaleString(undefined, {maximumFractionDigits: 9});
        if(lowerResult.length > 12){
            first = first.toExponential(5);
            lowerResult = first.toLocaleString();
        }
    }
    else{
        lowerResult = second.toLocaleString(undefined, {maximumFractionDigits: 9});
        if(lowerResult.length > 12){
            first = second.toExponential(5);
            lowerResult = second.toLocaleString();
        }
    }
    lowerDisplay.textContent = lowerResult;
}

function updateUpperDisplay(){
    if(operation != '')
        upperDisplay.textContent = first.toLocaleString() + " " + operation;
    else
        upperDisplay.textContent += (" "+ second.toLocaleString() + ' = ');
}

function clearLowerDisplay(){
    lowerDisplay.textContent = '';
}

function clearUpperDisplay(){
    upperDisplay.textContent = '';
}

function updateNumber(e){
    let n = parseInt(e.target.textContent);
    if(operation == ''){
        if(isDot)
            first = (first + parseInt(n)/Math.pow(10,++power));
        else    
            first = (first*10 + parseInt(n));
    }
    else{
        if(isDot)
            second = (second + parseInt(n)/Math.pow(10,++power));
        else    
            second = (second*10 + parseInt(n));
    }
    updateLowerDisplay();
}

function updateOperation(e){
    isDot = false;
    power = 0;
    let op = e.target.id;
    if(second!=0)
        evaluate();
    switch(op){
        case 'add': operation = '+'; break;
        case 'subtract': operation = '-'; break;
        case 'multiplication': operation = 'x'; break;
        case 'division': operation = '/'; break;
        case 'remainder': operation = '%'; break;
        default: operation = '';
    }
    updateUpperDisplay();
    clearLowerDisplay();
}

function updateSign(){
    (operation == '') ? first *= -1 : second *= -1;
    updateLowerDisplay();
    clearUpperDisplay();
}

function del(){
    if(operation == '')
        first = Math.trunc(first/10);
    else    
        second = Math.trunc(second/10);
    updateLowerDisplay();
}

function clear(){
    clearLowerDisplay();
    clearUpperDisplay();
    first = 0;
    second = 0;
    operation = '';
    isDot = false;
    power = 0;
}

function dot(){
    if(isDot) 
        return;
    isDot = true;
    lowerDisplay.textContent += '.';
}

function evaluate(){
    let temp = operation;
    if(second == 0 && operation!='x'){
        return;       
    }
    operation = '';
    updateUpperDisplay();
    operation = temp;
    switch(operation){
        case '+': 
            first = first + second; break;
        case '-':
            first = first - second; break;
        case 'x':
            first = first * second; break;
        case '/':
            first = first / second; break;
        case '%':
            first = first % second; break;
        default:
    }
    first = Math.round((first+ Number.EPSILON) * 100) / 100;
    second = 0;
    operation = '';
    updateLowerDisplay();
}

let power = 0
let isDot = false;
let first = 0;
let second = 0;
let operation = '';
let lowerResult;
let upperResult;
let lowerDisplay = document.querySelector('#bottom');
let upperDisplay = document.querySelector('#top');

const grid = document.querySelector('#grid');
gridNumbers = grid.querySelectorAll('.number');
gridNumbers.forEach(child => child.addEventListener('click', updateNumber));
gridOperators = grid.querySelectorAll('.operator');
gridOperators.forEach(child => child.addEventListener('click', updateOperation));
grid.querySelector('#equalto').addEventListener('click', evaluate);
grid.querySelector('#signChange').addEventListener('click', updateSign);
grid.querySelector('#delete').addEventListener('click', del);
grid.querySelector('#clear').addEventListener('click', clear);
grid.querySelector('#dot').addEventListener('click', dot);
