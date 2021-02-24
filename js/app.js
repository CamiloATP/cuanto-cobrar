(function() {
    const formulario = document.getElementById('formulario');
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');    
    
    let formula = '';
    let tipo = ''; 
    let total = 0;
    let error = [];

    // Form Inputs
    const rbtnTipoCantidad = document.querySelectorAll('[name=rbtnTipoCantidad]');

    const labelHoras = document.getElementById('labelHoras');
    const horas = document.getElementById('txtHoras');
    const contenedor_horas = document.getElementById('contenedor-horas');
    
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

    /**
     * Come back cash to origin numeric
     * ---
     * @param String str
     * @return Int 
     */
    const comeBackCash = (str) => {
        return Number(str.replace(/\./g, '').replace(/\,/g, ''));
    }

    /**
     * Validar campo númerico para operaciones internas
     * ---
     * @param Int data 
     * @return Boolean
     */
    const validarData = data => {
        if(!isNaN(data) && data !== '' && data !== undefined && data !== null && data > 0) return true;

        return false;
    }

    /**
     * Transition effect for errors
     * ---
     * @param NodeHTML node
     * @return void
     */
    const fadeOutMessage = node => {
        setTimeout(() => {
            node.style.opacity = 0.5;
            setTimeout(() => {
                node.style.opacity = 0.3;
                setTimeout(() => {
                    node.style.opacity = 0.1;
                    node.removeAttribute('style');
                    node.innerHTML = '';
                    if(node.querySelector('#error')) node.querySelector('#error').remove();
                }, 200);
            }, 500);
        }, 2000);
    }

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
                            error.push('Seleccione un campo!!');
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
            let beneficio = e.target.txtBeneficio.value.trim();

            // Validaciones globales
            if(!validarData(horaHombre)) 
            {
                error.push('Error, ingrese el valor por hora');
            }

            if(gastosExtras) 
            {
                if(!validarData(gastosExtras)) {
                    error.push('Error, ingrese valor válido de gastos extras');
                }
            }

            // Regular expression to replace \%
            const regExPercentSign = /\%/g;

            if(regExPercentSign.test(beneficio)) 
            {
                beneficio = beneficio.replace(regExPercentSign, '');
            }

            if(isNaN(beneficio)) 
            {
                error.push('Error, ingrese el porcentaje de beneficios como dato númerico o decimal(0.00)');
            }
            
            const porcentajeBeneficio = (Number(beneficio) / 100).toFixed(2) || 0.0;

            // Tipo de interacción a calcular
            switch (tipo) {
                case 'horas':

                    if(!validarData(horas)) 
                    {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }
                    
                    if(error.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * <strong>Cantidad de Horas</strong>: ${horas}) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`; 

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: \$${cashFormat((horaHombre * horas) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * horas) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * horas) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * horas) + gastosExtras) + ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'días':

                    if(!validarData(horas)) 
                    {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) 
                    {
                        error.push('Error, ingrese los días trabajados');
                    } 

                    if(error.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * (<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * (horas * dias)) + gastosExtras) + ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'semanas':

                    if(!validarData(horas)) 
                    {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) 
                    {
                        error.push('Error, ingrese los días trabajados');
                    } 

                    if(!validarData(semanas)) 
                    {
                        error.push('Error, ingrese la cantidad de semanas trabajadas');
                    }

                    if(error.length === 0) 
                    {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * ((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias * semanas)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias * semanas)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio)}`; 

                        total = ((horaHombre * (horas * dias * semanas)) + gastosExtras) + ((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                case 'meses':

                    if(!validarData(horas)) 
                    {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) 
                    {
                        error.push('Error, ingrese los días trabajados');
                    } 
                    
                    if(!validarData(semanas)) 
                    {
                        error.push('Error, ingrese la cantidad de semanas trabajadas');
                    }

                    if(!validarData(meses)) 
                    {
                        error.push('Error, ingrese los meses trabajados');
                    }

                    if(error.length === 0) 
                    {                 
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * (((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas}) * <strong>Meses</strong>: ${meses})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`
                        
                        formula += `<span class="h5">Beneficio</span>: (<strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}%) <= (${beneficio!== '' ? beneficio : 0}%)<hr>`;
                        
                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) + ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio;
                    }

                    break;
                default:
                    error.push('Error, con la interacción de tiempo para realizar cálculos!!');
            }        

            if(!isNaN(total) && error.length === 0) 
            {
                // Método(formula Math) que se usó
                metodo.innerHTML = '<span class=" h4 font-weight-bold mb-2"><i class="fas fa-file-invoice-dollar"></i> Cálculos realizados:</span><hr>' + formula;
                resultado.className += ' h2';
                resultado.innerHTML = `Total: \$${cashFormat(total)} <i class="fas fa-money-bill-wave"></i>`;
                window.location.hash = '#resultado'; // <-- Focus
            } else {
                metodo.innerHTML = '';
                resultado.classList.remove('h2');
                resultado.innerHTML = '';

                error.map(data => {
                    resultado.innerHTML += `<div id="error" class="alert alert-dismissible alert-danger">
                        <p class="mb-0">${data}</p>
                    </div>`;
                    
                    fadeOutMessage(resultado);
                });

                error = [];
            }
        }
    }    
})();

// TODO: Refactor the code, to make it more readable and scalable.
// TODO: Min data inside of the file JS
// TODO: Combine how much to charge per hour and how much to charge per project in a single project.