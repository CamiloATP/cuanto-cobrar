/**
 * Number.prototype.cashFormat(n, x, s, c)
 * ---
 * @param Int amount
 * @param Int lengthOfDecimal
 * @param Int lengthOfDot
 * @param mixed dotDelimiter
 * @param mixed decimalDelimiter
 * @origen https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
 * @return String
 * */
// Number.prototype.cashFormat = function(lengthOfDecimal = 0, lengthOfDot = 3, dotDelimiter = '.', decimalDelimiter = ',') {
const cashFormat = (amount, lengthOfDecimal = 0, lengthOfDot = 3, dotDelimiter = '.', decimalDelimiter = ',') => {
    const regexp = '\\d(?=(\\d{' + lengthOfDot + '})+' + (lengthOfDecimal > 0 ? '\\D' : '$') + ')', num = amount.toFixed(Math.max(0, ~~lengthOfDecimal));
    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(regexp, 'g'), '$&' + (dotDelimiter || ','));
};

/**
 * Come back cash to origin numeric
 * ---
 * @param String str
 * @return Int 
 */
const comeBackCash = str => {
    return Number(str.replace(/\./g, '').replace(/\,/g, ''));
}

/**
 * Validate number field for internal operations
 * ---
 * @param String message
 * @param Int data
 * @param Array errors
 * @return void
 */
const isValidNumber = (message, data, errors) => {
    if(isNaN(data)) errors.push(`${message} debe ser un valor númerico`);
    if(data == '') errors.push(`${message} debe ser diferente de vacío`);
    if(data == undefined) errors.push(`${message} debe ser diferente de undefined`);
    if(data == null) errors.push(`${message} debe ser diferente de null`);
    if(data <= 0) errors.push(`${message} debe ser mayor a cero`);
}

/**
 * Transition effect for errors
 * ---
 * @param NodeHTML node
 * @return void
 */
const fadeOutMessage = (node) => {
    setTimeout(() => {
        node.style.opacity = 0.5;
        setTimeout(() => {
            node.style.opacity = 0.3;
            setTimeout(() => {
                node.style.opacity = 0.1;
                node.removeAttribute('style');
                node.innerHTML = '';
                node.remove();
            }, 200);
        }, 500);
    }, 3000);
}

/**
 * Messages of error
 * ---
 * @param Array errors
 * @param NodeHTML node
 * @return void
 */
const messagesError = (errors, node) => {
    if(errors.length != 0)
    {
        let flag = errors.length - 1;

        errors.map((data, index) => {
            node.innerHTML += `<div id="error-${index}" class="alert alert-dismissible alert-danger">
                <p class="mb-0">${data}</p>
            </div>`;

            setTimeout(() => {
                fadeOutMessage(node.querySelector(`#error-${index}`));
            }, flag * 1000);

            flag--;
        });
    }
}

export {
    cashFormat,
    comeBackCash,
    isValidNumber,
    messagesError
};
