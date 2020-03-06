function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let tokenOfNum = true;
    let tokenOfOp = false;
    let stakcOfNums = [];
    let stackOfOps = [];

    let count = 0;
    let arrOfStr = expr.split(" ").join("").split("");

    for (let i = 0; i < arrOfStr.length; i++) {
        if (arrOfStr[i] === '(') {
            count++;
        }
        if (arrOfStr[i] === ')') {
            count--;
        }
    }
    if (count != 0) {
        throw new Error('ExpressionError: Brackets must be paired');
    }


    for (let i = 0; i < expr.length; i++) {
        switch (expr[i]) {
            case '-':
                if (!tokenOfOp) {
                    stakcOfNums.push(0);
                    stackOfOps.push('-');
                    break;
                }
            case '+':
            case '*':
            case '/':
            case ')':
                if (tokenOfOp) {
                    tokenOfNum = true;
                    while (getPriority(expr[i]) <= getPriority(stackOfOps[stackOfOps.length - 1])) {
                        calculate(stakcOfNums, stackOfOps);
                    }
                    if (expr[i] === ')') {
                        let open = stackOfOps.pop();
                        if (open !== '(') {
                            throw new Error("ExpressionError: Brackets must be paired");
                        } 
                    } else {
                        stackOfOps.push(expr[i]);
                        tokenOfOp = false;
                    }
                }
                break;
            case '(':
                stackOfOps.push('(');
                break;
            case ' ':
                break;
            default:
                if (tokenOfNum) {
                    stakcOfNums.push(expr[i]);
                    tokenOfNum = false;
                } else {
                    let number = stakcOfNums.pop();
                    number = number + expr[i];
                    stakcOfNums.push(number);
                }
                tokenOfOp = true;
        }
    }
    while (stackOfOps.length > 0) {
        calculate(stakcOfNums, stackOfOps);
    }
    return stakcOfNums[0];
}

function getPriority(expr) {
    switch (expr) {
        case ')':
            return 0;
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return -1;
    }
}

function calculate(stakcOfNums, stackOfOps) {
    let operator = stackOfOps.pop();
    let a = parseFloat(stakcOfNums.pop());
    let b = parseFloat(stakcOfNums.pop());

    switch (operator) {
        case '+':
            stakcOfNums.push(a + b);
            break;
        case '-':
            stakcOfNums.push(b - a);
            break;
        case '*':
            stakcOfNums.push(a * b);
            break;
        case '/':
            if (a == 0) throw new Error("TypeError: Division by zero.");
            stakcOfNums.push(b / a);
            break;
    }
}


module.exports = {
    expressionCalculator
}