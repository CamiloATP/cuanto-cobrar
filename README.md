# ¿Cuánto cobrar por proyecto? | ¿Cuánto cobrar por hora? #
### A realizar, terminar y/o cobrar" ###
#### ¿Freelancer? ####

Demo: [¿Cuánto cobrar por proyecto?](https://camiloatp.github.io/cuanto-cobrar/)

Demo2: [¿Cuánto cobrar por hora?](https://camiloatp.github.io/cuanto-cobrar/por-hora.html)

Calcular el valor de tu proyecto o trabajo realizado. En base al valor de tu hora de trabajo, el proyecto se encuentra con el formato de moneda **CLP** - Chile.

Dado los distintos formatos de monedas internacionales, se puede pasar por parametros datos a la función en base a la necesidad de utilizar otros formatos sin ningún problema.

```
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
```

## Formulas simples para calcular los precios ##

### Horas ###
```
total = ((horaHombre * horas) + gastosExtras) + ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio;
```

### Días ###
```
total = ((horaHombre * (horas * dias)) + gastosExtras) + ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio;
```

### Semanas ###
```
total = ((horaHombre * (horas * dias * semanas)) + gastosExtras) + ((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio;
```

### Meses ###
```
total = ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) + ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio;
```
