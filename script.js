function checkKey(e){
    let key = grid.querySelector(".key[data-key = '" + e.key + "']");
    if(key.classList.contains('number'))
        updateNumber(key);
    else if(key.classList.contains('operator'))
        updateOperation(key);
    else if(key.id == "dot")
        dot(key);
    else if(key.id == "equalto")
        evaluate();
    else if(key.id == "signChange")
        updateSign();
    else if(key.id == "delete")
        del();
    else if(key.id == "clear")
        clear(); 
}

function updateLowerDisplay(){
    (operation == '') ? lowerResult = first : lowerResult = second;
    lowerDisplay.textContent = lowerResult;
}

function updateUpperDisplay(){
    if(operation != '')
        upperDisplay.textContent = first + " " + operation;
    else
        upperDisplay.textContent += (" "+ second + ' = ');
}

function clearLowerDisplay(){
    lowerDisplay.textContent = '';
}

function clearUpperDisplay(){
    upperDisplay.textContent = '';
}

function updateNumber(target){
    console.log(target);
    let n = target.textContent;
    (operation == '') ? first += n : second += n;
    updateLowerDisplay();
}

function updateOperation(target){
    let op = target.id;
    isDot = false;
    if(first == '') return;
    if(second != '')
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
    console.log("in");
    if(operation == ''){
        if(first != '')
            (first[0] == '-') ? first = first.slice(1,) : first = '-' + first;
    }
    else{
        if(second != '')
            (second[0] == '-') ? second = second.slice(1,) : second = '-' + second;
    }
    updateLowerDisplay();
    clearUpperDisplay();
}

function del(){
    if(operation == '')
        first = first.slice(0,-1);
    else    
        second = second.slice(0,-1);
    updateLowerDisplay();
}

function clear(){
    clearLowerDisplay();
    clearUpperDisplay();
    first = '';
    second = '';
    operation = '';
    isDot = false;
}

function dot(target){
    if(operation == '')
        if(first.includes('.')) return;
    else 
        if(second.includes('.')) return;
    updateNumber(target);
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
        case '+': first = parseFloat((parseFloat(first)+parseFloat(second)).toFixed(9)).toString(); break;
        case '-': first = parseFloat((first - second).toFixed(9)).toString(); break;
        case 'x': first = parseFloat((first * second).toFixed(9)).toString(); break;
        case '/': first = parseFloat((first / second).toFixed(9)).toString(); break;
        case '%': first = parseFloat((first % second).toFixed(9)).toString(); break;
        default: break;
    }
    second = '';
    operation = '';
    isDot = false;
    updateLowerDisplay();
}

let isDot = false;  // To only allow one decimal point in a number
let first = '';
let second = '';
let operation = '';
let lowerResult;
let upperResult;
let lowerDisplay = document.querySelector('#bottom');
let upperDisplay = document.querySelector('#top');

const grid = document.querySelector('#grid');
gridNumbers = grid.querySelectorAll('.number');
gridNumbers.forEach(child => child.addEventListener('click',function(e){updateNumber(e.target)}));
gridOperators = grid.querySelectorAll('.operator');
gridOperators.forEach(child => child.addEventListener('click', function(e){updateOperation(e.target)}));
grid.querySelector('#equalto').addEventListener('click', evaluate);
grid.querySelector('#signChange').addEventListener('click', updateSign);
grid.querySelector('#delete').addEventListener('click', del);
grid.querySelector('#clear').addEventListener('click', clear);
grid.querySelector('#dot').addEventListener('click', function(e){dot(e.target)});

window.addEventListener('keydown', checkKey);