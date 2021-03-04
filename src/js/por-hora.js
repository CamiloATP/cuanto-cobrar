import {currenciesFormat, comeBackCash, isValidNumber, messagesError} from './functions.js';
import localesJSON from './../data/locales.json'; // <-- https://raw.githubusercontent.com/umpirsky/locale-list/master/data/en_US/locales.json
import currenciesJSON from './../data/currencies.json'; // <-- https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en_US/currency.json
import Swal from './sweetalert2.all.min.js';

import './../css/bootstrap.min.css';
import './../css/style.css';

(function() {
    const formulario = document.getElementById('formulario');
    const locales = Object.keys(localesJSON);
    const currencies = Object.keys(currenciesJSON);
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');
    let formula = '';
    let errors = [];

    let ddlLocales = document.getElementById('ddlLocales');
    
    for (let i = 0; i < locales.length; i++) 
    {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(locales[i]));
    
        if(locales[i] == 'es-CL') opt.selected = true;
    
        opt.value = locales[i];
        ddlLocales.appendChild(opt); 
    }
    
    let ddlCurrencies = document.getElementById('ddlCurrencies');
    
    for (let i = 0; i < currencies.length; i++) 
    {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(currencies[i]));
        
        if(currencies[i] == 'CLP') opt.selected = true;
    
        opt.value = currencies[i];
        ddlCurrencies.appendChild(opt); 
    }

    if(formulario) 
    {
        formulario.onsubmit = e => {
            e.preventDefault();
            
            const salario = Number(comeBackCash(e.target.salario.value.trim()));
            const cantHoras = Number(e.target.cantHoras.value.trim());
            const cantDias = Number(e.target.cantDias.value.trim());
            const vacaciones = Number(e.target.vacaciones.value.trim());
            const feriados = Number(e.target.feriados.value.trim());
            const gastosExtras = Number(comeBackCash(e.target.gastosExtras.value.trim()));
            const currency = e.target.ddlCurrencies.value;
            const locale = e.target.ddlLocales.value;
            let beneficio = e.target.beneficio.value.trim();            

            // ===========================================================
            // Validar datos de entrada 
            // ===========================================================            
            isValidNumber('El salario', salario, errors);
            isValidNumber('La cantidad de horas', cantHoras, errors);
            isValidNumber('La cantidad de días', cantDias, errors);

            if(vacaciones) isValidNumber('Las cantidad de días de vacaciones', vacaciones, errors);
            if(feriados) isValidNumber('La cantidad de días feríados', feriados, errors);
            if(gastosExtras) isValidNumber('Gastos extras', gastosExtras, errors);

            // Regular expression to replace \%
            const regExPercentSign = /\%/g;

            if(regExPercentSign.test(beneficio)) 
            {
                beneficio = beneficio.replace(regExPercentSign, '');
            }

            if(isNaN(beneficio)) errors.push('Porcentaje de beneficio debe ser númerico o décimal => 0.0');

            // ===========================================================
            // Calcular ¿Cuánto cobrar por hora?
            // ===========================================================
            // Sueldo bruto anual (salario * 12 meses)
            const sueldoAnual = salario * 12;

            // Calcular la cantidad de horas a trabajar anualmente (horas × días × 52 semanas)
            const totalHoras = cantHoras * cantDias * 52;

            // Valor base por hora
            const valorBaseHora = Math.ceil(sueldoAnual / totalHoras);

            // Valor de las horas libres
            const horasLibres = (vacaciones * cantHoras) + (feriados * cantHoras);
            const valorHorasLibres = horasLibres * valorBaseHora;

            // Gastos extras anual (gastos extras * 12 meses)
            const totalGastosExtras = gastosExtras * 12;

            // Beneficio anual.
            const beneficioAnual = (totalHoras - horasLibres) * valorBaseHora;

            // Valor extra anual
            const valorExtraAnual = valorHorasLibres + totalGastosExtras;

            // Porcentaje de Rentabilidad
            const rentabilidad = (valorExtraAnual / beneficioAnual).toFixed(3);
            
            // Porcentaje de Beneficio por trabajo
            const porcentajeBeneficio = (Number(beneficio) / 100).toFixed(2) || 0.0;

            // Total
            const valorPorHoraTrabajo = Math.ceil((valorBaseHora + (valorBaseHora * rentabilidad)) + (valorBaseHora * porcentajeBeneficio));

            if(errors.length == 0) 
            {
                formula = `<strong>Sueldo bruto anual</strong>: (${currenciesFormat(locale, currency, salario)} * 12 meses) = ${currenciesFormat(locale, currency, sueldoAnual)}<hr>`;
                formula += `<strong>Cantidad de horas a trabajar anualmente</strong>: (${cantHoras} * ${cantDias} * 52 semanas) = ${totalHoras}hrs<hr>`;
                formula += `<strong>Valor base por hora</strong>: (${currenciesFormat(locale, currency, sueldoAnual)} / ${currenciesFormat(locale, currency, totalHoras)}) = ${currenciesFormat(locale, currency, valorBaseHora)}<hr>`;
                formula += `<strong>Cantidad de las horas libres (Vacaciones y feriados)</strong>: (${vacaciones} * ${cantHoras}) + (${feriados} * ${cantHoras}) = ${horasLibres}hrs<hr>`;
                formula += `<strong>Valor de las horas libres (Vacaciones y feriados)</strong>: (${currenciesFormat(locale, currency, horasLibres)}hrs * ${currenciesFormat(locale, currency, valorBaseHora)}) = ${currenciesFormat(locale, currency, valorHorasLibres)}<hr>`;
                formula += `<strong>Gastos extras anual</strong>: (${currenciesFormat(locale, currency, gastosExtras)} * 12 meses) = ${currenciesFormat(locale, currency, totalGastosExtras)}<hr>`;
                formula += `<strong>Beneficio anual</strong>: (${currenciesFormat(locale, currency, totalHoras)}hrs - ${currenciesFormat(locale, currency, horasLibres)}hrs) * ${currenciesFormat(locale, currency, valorBaseHora)} = ${currenciesFormat(locale, currency, beneficioAnual)}<hr>`;
                formula += `<strong>Valor Extra Anual</strong>: ${currenciesFormat(locale, currency, valorHorasLibres)} + ${currenciesFormat(locale, currency, totalGastosExtras)} = ${currenciesFormat(locale, currency, valorExtraAnual)}<hr>`;
                formula += `<strong>Porcentaje de Rentabilidad</strong>: (${currenciesFormat(locale, currency, valorExtraAnual)} / ${currenciesFormat(locale, currency, beneficioAnual)}) = ${(rentabilidad*100).toFixed(3)}%<hr>`;
                formula += `<strong>Valor por hora de trabajo</strong>: (${currenciesFormat(locale, currency, valorBaseHora)} + (${currenciesFormat(locale, currency, valorBaseHora)} * ${(rentabilidad*100).toFixed(3)}%) + (${currenciesFormat(locale, currency, valorBaseHora)} * ${porcentajeBeneficio}%)) = ${currenciesFormat(locale, currency, valorPorHoraTrabajo)}<hr>`;

                
                metodo.innerHTML = '<span class="h4 font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados: </span><hr>' + formula;
                resultado.className += ' h2';
                resultado.innerHTML = `<span class="h4 font-weight-bold mb-2">Total: ${currenciesFormat(locale, currency, valorPorHoraTrabajo)} <i class="fas fa-money-bill-wave"></i></span>`;

                var result = formula += `<span class="h2 font-weight-bold mb-2">Total: ${currenciesFormat(locale, currency, valorPorHoraTrabajo)} <i class="fas fa-money-bill-wave"></i></span>`;

                Swal.fire({
                    title: '<span class="font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados: </span>',
                    icon: 'success',
                    width: '800px',
                    html: result,
                    confirmButtonColor: '#28a745',
                    confirmButtonText: 'Ok!!'
                });

                // resultado.focus(); // <-- Focus
            } else {
                metodo.innerHTML = '';
                resultado.classList.remove('h2');
                resultado.innerHTML = '';
            
                messagesError(errors, resultado);

                errors = [];
            }
        } 
    }
})();