import {cashFormat, comeBackCash, isValidNumber, messagesError} from './functions.js';

(function() {
    const formulario = document.getElementById('formulario');
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');
    let formula = '';
    let errors = [];    

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
                formula = `<strong>Sueldo bruto anual</strong>: (\$${cashFormat(salario)} * 12 meses) = \$${cashFormat(sueldoAnual)}<hr>`;
                formula += `<strong>Cantidad de horas a trabajar anualmente</strong>: (${cantHoras} * ${cantDias} * 52 semanas) = ${cashFormat(totalHoras)}hrs<hr>`;
                formula += `<strong>Valor base por hora</strong>: (\$${cashFormat(sueldoAnual)} / ${cashFormat(totalHoras)}) = \$${cashFormat(valorBaseHora)}<hr>`;
                formula += `<strong>Cantidad de las horas libres (Vacaciones y feriados)</strong>: (${vacaciones} * ${cantHoras}) + (${feriados} * ${cantHoras}) = ${cashFormat(horasLibres)}hrs<hr>`;
                formula += `<strong>Valor de las horas libres (Vacaciones y feriados)</strong>: (${cashFormat(horasLibres)}hrs * \$${cashFormat(valorBaseHora)}) = \$${cashFormat(valorHorasLibres)}<hr>`;
                formula += `<strong>Gastos extras anual</strong>: (\$${cashFormat(gastosExtras)} * 12 meses) = \$${cashFormat(totalGastosExtras)}<hr>`;
                formula += `<strong>Beneficio anual</strong>: (${cashFormat(totalHoras)}hrs - ${cashFormat(horasLibres)}hrs) * \$${cashFormat(valorBaseHora)} = \$${cashFormat(beneficioAnual)}<hr>`;
                formula += `<strong>Valor Extra Anual</strong>: \$${cashFormat(valorHorasLibres)} + \$${cashFormat(totalGastosExtras)} = \$${cashFormat(valorExtraAnual)}<hr>`;
                formula += `<strong>Porcentaje de Rentabilidad</strong>: (\$${cashFormat(valorExtraAnual)} / \$${cashFormat(beneficioAnual)}) = ${(rentabilidad*100).toFixed(3)}%<hr>`;
                formula += `<strong>Valor por hora de trabajo</strong>: (\$${cashFormat(valorBaseHora)} + (\$${cashFormat(valorBaseHora)} * ${(rentabilidad*100).toFixed(3)}%) + (\$${cashFormat(valorBaseHora)} * ${porcentajeBeneficio}%)) = \$${cashFormat(valorPorHoraTrabajo)}<hr>`;
    
                metodo.innerHTML = '<span class="h4 font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados: </span><hr>' + formula;
                resultado.className += ' h2';
                resultado.innerHTML = `<span class="h4 font-weight-bold mb-2">Total: \$${cashFormat(valorPorHoraTrabajo)} <i class="fas fa-money-bill-wave"></i></span>`;
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