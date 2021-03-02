import {currenciesFormat, comeBackCash, isValidNumber, messagesError} from './functions.js';
import localesJSON from './locales.js'; // <-- https://raw.githubusercontent.com/umpirsky/locale-list/master/data/en_US/locales.json
import currenciesJSON from './currencies.js'; // <-- https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en_US/currency.json

(function() {
    const formulario = document.getElementById('formulario');
    const locales = Object.keys(localesJSON);
    const currencies = Object.keys(currenciesJSON);
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');
    
    let formula = '';
    let tipo = ''; 
    let total = 0;
    let errors = [];

    // Form Inputs
    const rbtnTipoCantidad = document.querySelectorAll('[name=rbtnTipoCantidad]');

    const labelHoras = document.getElementById('labelHoras');
    const horas = document.getElementById('txtHoras');
    const contenedor_horas = document.getElementById('contenedor-horas');

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
    
    const labelDias = document.getElementById('labelDias');
    const dias = document.getElementById('txtDias');
    const contenedor_dias = document.getElementById('contenedor-dias');
    
    const labelSemanas = document.getElementById('labelSemanas');
    const semanas = document.getElementById('txtSemanas');
    const contenedor_semanas = document.getElementById('contenedor-semanas');
    
    const labelMeses = document.getElementById('labelMeses');
    const meses = document.getElementById('txtMeses');
    const contenedor_meses = document.getElementById('contenedor-meses');

    if(labelHoras) labelHoras.hidden = true;
    if(contenedor_horas) contenedor_horas.hidden = true;
    
    if(labelDias) labelDias.hidden = true;
    if(contenedor_dias) contenedor_dias.hidden = true;
    
    if(labelSemanas) labelSemanas.hidden = true;
    if(contenedor_semanas) contenedor_semanas.hidden = true; 
    
    if(labelMeses) labelMeses.hidden = true;       
    if(meses) meses.onkeyup = () => semanas.value = Number(meses.value) * 4;
    if(contenedor_meses) contenedor_meses.hidden = true;

    if(formulario)
    {
        for (let i = 0; i < rbtnTipoCantidad.length; i++)
        {  
            rbtnTipoCantidad[i].onchange = () => {
                if(rbtnTipoCantidad[i].checked === true)
                {
                    // Habilitar y deshabilitar inputs
                    switch(rbtnTipoCantidad[i].value) 
                    {
                        case 'Horas':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-12';
                            horas.placeholder = 'Ingrese cantidad de horas';
                            horas.required = true;

                            labelDias.hidden = true;                            
                            contenedor_dias.hidden = true;
                            dias.required = false;
                            
                            labelSemanas.hidden = true;
                            contenedor_semanas.hidden = true;
                            semanas.required = false;
                            
                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            meses.required = false;

                            tipo = 'horas';
                            break;
                        case 'Dias':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.placeholder = 'Ingrese cantidad de horas por día';
                            horas.required = true;

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días';
                            dias.required = true;

                            labelSemanas.hidden = true;
                            contenedor_semanas.hidden = true;
                            semanas.required = false;

                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            meses.required = false;

                            tipo = 'días';
                            break;
                        case 'Semanas':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.placeholder = 'Ingrese cantidad de horas por día';
                            horas.required = true;

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días <span class="font-weight-bold">por semana</span>';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días por semana';
                            dias.required = true;

                            labelSemanas.hidden = false;
                            labelSemanas.innerHTML = 'Cantidad de semanas';
                            contenedor_semanas.hidden = false;
                            contenedor_semanas.className = 'col-md-12';
                            semanas.placeholder = 'Ingrese cantidad de semanas';
                            semanas.required = true

                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            meses.required = false;

                            tipo = 'semanas';
                            break;
                        case 'Meses':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.placeholder = 'Ingrese cantidad de horas por día';
                            horas.required = true;

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días <span class="font-weight-bold">por semana</span>';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días por semana';
                            dias.required = true;

                            labelSemanas.hidden = false;
                            labelSemanas.innerHTML = 'Cantidad de semanas <span class="font-weight-bold">por mes</span>';
                            contenedor_semanas.hidden = false;
                            contenedor_semanas.className = 'col-md-6';
                            semanas.placeholder = 'Ingrese cantidad de semanas por mes';
                            semanas.required = true;

                            labelMeses.hidden = false;
                            contenedor_meses.hidden = false;
                            meses.required = true;

                            tipo = 'meses';
                            break;
                        default:
                            errors.push('Seleccione un campo de tiempo!!');
                    }
                }       
            }
        }

        formulario.onsubmit = (e) => {
            e.preventDefault();
            
            const horaHombre = comeBackCash(e.target.txtHoraHombre.value.trim());
            const meses = Number(e.target.txtMeses.value.trim());            
            const semanas = Number(e.target.txtSemanas.value.trim());
            const dias = Number(e.target.txtDias.value.trim());
            const horas = Number(e.target.txtHoras.value.trim());
            const gastosExtras = comeBackCash(e.target.txtGastosExtras.value.trim());
            const currency = e.target.ddlCurrencies.value;
            const locale = e.target.ddlLocales.value;
            let beneficio = e.target.txtBeneficio.value.trim();

            // Validaciones globales
            isValidNumber('Valor por hora', horaHombre, errors);

            if(gastosExtras) isValidNumber('Gastos extras', gastosExtras, errors);

            // Regular expression to replace \%
            const regExPercentSign = /\%/g;

            if(regExPercentSign.test(beneficio)) 
            {
                beneficio = beneficio.replace(regExPercentSign, '');
            }

            if(isNaN(beneficio)) errors.push('Porcentaje de beneficio debe ser númerico o décimal => 0.0');
            
            const porcentajeBeneficio = (Number(beneficio) / 100).toFixed(2) || 0.0;

            // Tipo de interacción a calcular
            switch (tipo) {
                case 'horas':

                    isValidNumber('La cantidad de horas', horas, errors);

                    if(errors.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${currenciesFormat(locale, currency, horaHombre)} * <strong>Cantidad de Horas</strong>: ${horas}) + <strong>Gastos Extras</strong>: ${currenciesFormat(locale, currency, gastosExtras)})<hr>`; 

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: ${currenciesFormat(locale, currency, (horaHombre * horas) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: ${currenciesFormat(locale, currency, (horaHombre * horas) + gastosExtras)} + <span class="h5">Beneficio</span>: ${currenciesFormat(locale, currency, ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio)}<hr>`;

                        total = ((horaHombre * horas) + gastosExtras) + ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'días':

                    isValidNumber('La cantidad de horas', horas, errors);
                    isValidNumber('La cantidad días', dias, errors);

                    if(errors.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${currenciesFormat(locale, currency, locale, currency, horaHombre)} * (<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias)) + gastosExtras)} + <span class="h5">Beneficio</span>: ${currenciesFormat(locale, currency, ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio)}<hr>`;

                        total = ((horaHombre * (horas * dias)) + gastosExtras) + ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'semanas':
                    isValidNumber('La cantidad de horas', horas, errors);
                    isValidNumber('La cantidad días', dias, errors);
                    isValidNumber('La cantidad de semanas', semanas, errors);

                    if(errors.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${currenciesFormat(locale, currency, horaHombre)} * ((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias * semanas)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias * semanas)) + gastosExtras)} + <span class="h5">Beneficio</span>: ${currenciesFormat(locale, currency, ((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio)}<hr>`; 

                        total = ((horaHombre * (horas * dias * semanas)) + gastosExtras) + ((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'meses':

                    isValidNumber('La cantidad de horas', horas, errors);
                    isValidNumber('La cantidad días', dias, errors);
                    isValidNumber('La cantidad de semanas', semanas, errors);
                    isValidNumber('La cantidad de meses', meses, errors);

                    if(errors.length === 0) 
                    {                 
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${currenciesFormat(locale, currency, horaHombre)} * (((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas}) * <strong>Meses</strong>: ${meses})) + <strong>Gastos Extras</strong>: ${currenciesFormat(locale, currency, gastosExtras)})<hr>`
                        
                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;
                        
                        formula += `<span class="h5">Costo</span>: ${currenciesFormat(locale, currency, (horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} + <span class="h5">Beneficio</span>: ${currenciesFormat(locale, currency, ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio)}<hr>`;

                        total = ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) + ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                default:
                    errors.push('Error, con la interacción de tiempo para realizar cálculos!!');
            }        

            if(errors.length == 0) 
            {
                // Método(formula Math) que se usó
                metodo.innerHTML = '<span class="h4 font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados:</span><hr>' + formula;
                resultado.className += ' h2';
                resultado.innerHTML = `Total: ${currenciesFormat(locale, currency, total)} <i class="fas fa-money-bill-wave"></i>`;

                var result = formula += `<span class="h2 font-weight-bold mb-2"> Total: ${currenciesFormat(locale, currency, total)} <i class="fas fa-money-bill-wave"></i></span>`;

                Swal.fire({
                    title: '<span class="font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados: </span>',
                    icon: 'success',
                    width: '800px',
                    html: result,
                    confirmButtonColor: '#28a745',
                    confirmButtonText: 'Ok!!'
                });
                // window.location.hash = '#resultado'; // <-- Focus
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