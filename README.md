# Calcular precio por trabajo o proyecto #
### "A realizar, terminar y/o cobrar" ###
#### ¿Freelancer? ####

Demo: [calcular-precio-por-proyecto](https://camiloatp.github.io/calcular-trabajo/)

Calcular el valor de tu proyecto o trabajo realizado. En base al valor de tu hora de trabajo, proyecto se encuentra con el formato de moneda **CLP** - Chile.

Dado los distintos formatos de monedas internacionales, se puede pasar por parametros datos a la función en base de la necesidad de utilizar otros formatos sin ningún problema.

```
/**
 * Number.prototype.cashFormat(n, x, s, c)
 * ---
 * @param integer data: <- amount
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed s: sections delimiter
 * @param mixed c: decimal delimiter
 * @origen https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
 * @return String
 * */
// Number.prototype.cashFormat = function(n = 0, x = 3, s = '.', c = ',') {
const cashFormat = (data, n = 0, x = 3, s = '.', c = ',') => {
    const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\D' : '$') + ')', num = data.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
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
