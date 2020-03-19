(function(){
    const formulario = document.getElementById('formulario');
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');    
    let formula = '';
    let tipo = ''; 
    let error = [];
    let total = 0;

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

    const comeBackCash = (str) => {
        return Number(str.replace(/\./g, '').replace(/\,/g, ''));
    }

    // Proceso cuando aún no se envía el formulario con sus campos
    const cargar = () => {
        const rbtnTipoCantidad = document.querySelectorAll('[name=rbtnTipoCantidad]');

        const labelHoras = document.getElementById('labelHoras');
        if(labelHoras) labelHoras.hidden = true;

        const horas = document.getElementById('txtHoras');

        const contenedor_horas = document.getElementById('contenedor-horas');
        if(contenedor_horas) contenedor_horas.hidden = true;

        const labelDias = document.getElementById('labelDias');
        if(labelDias) labelDias.hidden = true;

        const dias = document.getElementById('txtDias');

        const contenedor_dias = document.getElementById('contenedor-dias');
        if(contenedor_dias) contenedor_dias.hidden = true;

        const labelSemanas = document.getElementById('labelSemanas');
        if(labelSemanas) labelSemanas.hidden = true;

        const semanas = document.getElementById('txtSemanas');

        const contenedor_semanas = document.getElementById('contenedor-semanas');
        if(contenedor_semanas) contenedor_semanas.hidden = true;
        
        const labelMeses = document.getElementById('labelMeses');
        if(labelMeses) labelMeses.hidden = true;

        const meses = document.getElementById('txtMeses');
        
        if(meses) {
            // meses.hidden = true;            
            meses.onkeyup = () => {
                semanas.value = Number(meses.value) * 4;
            };
        }

        const contenedor_meses = document.getElementById('contenedor-meses');
        if(contenedor_meses) contenedor_meses.hidden = true;
        
        for (let i = 0; i < rbtnTipoCantidad.length; i++)
        {  
            rbtnTipoCantidad[i].onchange = () => {
                if(rbtnTipoCantidad[i].checked === true)
                {
                    switch(rbtnTipoCantidad[i].value){
                        case 'Horas':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-12';
                            horas.hidden = false;
                            horas.placeholder = 'Ingrese cantidad de horas';

                            labelDias.hidden = true;                            
                            contenedor_dias.hidden = true;

                            labelSemanas.hidden = true;
                            contenedor_semanas.hidden = true;

                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            tipo = 'horas';
                            break;
                        case 'Dias':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.hidden = false;
                            horas.placeholder = 'Ingrese cantidad de horas por día';

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días';

                            labelSemanas.hidden = true;
                            contenedor_semanas.hidden = true;

                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            tipo = 'días';
                            break;
                        case 'Semanas':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.placeholder = 'Ingrese cantidad de horas por día';

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días <span class="font-weight-bold">por semana</span>';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días por semana';


                            labelSemanas.hidden = false;
                            labelSemanas.innerHTML = 'Cantidad de semanas';
                            contenedor_semanas.hidden = false;
                            contenedor_semanas.className = 'col-md-12';
                            semanas.placeholder = 'Ingrese cantidad de semanas';

                            labelMeses.hidden = true;
                            contenedor_meses.hidden = true;
                            tipo = 'semanas';
                            break;
                        case 'Meses':
                            labelHoras.hidden = false;
                            labelHoras.innerHTML = 'Cantidad de horas <span class="font-weight-bold">por día</span>';
                            contenedor_horas.hidden = false;
                            contenedor_horas.className = 'col-md-6';
                            horas.placeholder = 'Ingrese cantidad de horas por día';

                            labelDias.hidden = false;
                            labelDias.innerHTML = 'Cantidad de días <span class="font-weight-bold">por semana</span>';
                            contenedor_dias.hidden = false;
                            dias.placeholder = 'Ingrese cantidad de días por semana';

                            labelSemanas.hidden = false;
                            labelSemanas.innerHTML = 'Cantidad de semanas <span class="font-weight-bold">por mes</span>';
                            contenedor_semanas.hidden = false;
                            contenedor_semanas.className = 'col-md-6';
                            semanas.placeholder = 'Ingrese cantidad de semanas por mes';

                            labelMeses.hidden = false;
                            contenedor_meses.hidden = false;
                            tipo = 'meses';
                            break;
                        default:
                            error.push('Seleccione un campo!!');
                    }
                }       
            }
        }    
    }

    const validarData = data => {
        if(!isNaN(data) && data !== '' && data !== undefined && data !== null && data > 0)
        {
            return true;
        }

        return false;
    }

    const fadeOutMessage = node => {
        setTimeout(() => {
            node.style.opacity = 0.5;
            setTimeout(() => {
                node.style.opacity = 0.2;
                setTimeout(() => {
                    node.removeAttribute('style');
                    node.innerHTML = '';
                    if(node.querySelector('#error')){
                        node.querySelector('#error').remove();
                    }
                }, 150);
            }, 150);
        }, 2700);
    }

    if(formulario)
    {
        cargar();

        formulario.onsubmit = (e) => {
            e.preventDefault();
            
            const horaHombre = comeBackCash(document.getElementById('txtHoraHombre').value.trim());
            const meses = Number(document.getElementById('txtMeses').value.trim());            
            const semanas = Number(document.getElementById('txtSemanas').value.trim());
            const dias = Number(document.getElementById('txtDias').value.trim());
            const horas = Number(document.getElementById('txtHoras').value.trim());
            const gastosExtras = comeBackCash(document.getElementById('txtGastosExtras').value.trim());

            if(!validarData(horaHombre)) {
                error.push('Error, ingrese el valor por hora');
            }

            if(gastosExtras) {
                if(!validarData(gastosExtras)) {
                    error.push('Error, ingrese valor válido de gastos extras');
                }
            }

            let beneficio = document.getElementById('txtBeneficio').value.trim();

            if(/\%/g.test(beneficio)) {
                beneficio = beneficio.replace(/\%/g, '');
            }

            if(isNaN(beneficio)) {
                error.push('Error, ingrese el porcentaje de beneficios como dato númerico o decimal(0.00)');
            }
            
            const porcentajeBeneficio = (Number(beneficio) / 100).toFixed(2) || 0.0;

            switch (tipo) {
                case 'horas':
                    if(!validarData(horas)) {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }
                    
                    if(error.length === 0) {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * <strong>Cantidad de Horas</strong>: ${horas}) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`; 

                        formula += `<span class="h5">Beneficio</span>: <strong>Costo</strong>: \$${cashFormat((horaHombre * horas) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}% = (${beneficio!== '' ? beneficio : '0'}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * horas) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * horas) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * horas) + gastosExtras) + ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio;
                    }
                    break;
                case 'días':
                    if(!validarData(horas)) {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) {
                        error.push('Error, ingrese los días trabajados');
                    } 

                    if(error.length === 0) {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * (<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: <strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}% = (${beneficio!== '' ? beneficio : '0'}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * (horas * dias)) + gastosExtras) + ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio;
                    }    
                    break;
                case 'semanas':
                    if(!validarData(horas)) {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) {
                        error.push('Error, ingrese los días trabajados');
                    } 

                    if(!validarData(semanas)) {
                        error.push('Error, ingrese la cantidad de semanas trabajadas');
                    }

                    if(error.length === 0) {
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * ((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`;

                        formula += `<span class="h5">Beneficio</span>: <strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias * semanas)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}% = (${beneficio!== '' ? beneficio : '0'}%)<hr>`;

                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias * semanas)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio)}`; 

                        total = ((horaHombre * (horas * dias * semanas)) + gastosExtras) + ((horaHombre * (horas * dias * semanas)) + gastosExtras) * porcentajeBeneficio;
                    }
                    break;
                case 'meses':
                    if(!validarData(horas)) {
                        error.push('Error, ingrese la cantidad de horas trabajadas');
                    }

                    if(!validarData(dias)) {
                        error.push('Error, ingrese los días trabajados');
                    } 
                    
                    if(!validarData(semanas)) {
                        error.push('Error, ingrese la cantidad de semanas trabajadas');
                    }

                    if(!validarData(meses)) {
                        error.push('Error, ingrese los meses trabajados');
                    }

                    if(error.length === 0) {                        
                        formula = `<span class="h5">Costo</span>: ((<strong>Valor por Hora</strong>: ${cashFormat(horaHombre)} * (((<strong>Cantidad de Horas</strong>: ${horas} * <strong>Días</strong>: ${dias}) * <strong>Semanas</strong>: ${semanas}) * <strong>Meses</strong>: ${meses})) + <strong>Gastos Extras</strong>: ${gastosExtras})<hr>`
                        
                        formula += `<span class="h5">Beneficio</span>: <strong>Costo</strong>: \$${cashFormat((horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} * <strong>Porcentaje del beneficio</strong>: ${porcentajeBeneficio}% = (${beneficio!== '' ? beneficio : '0'}%)<hr>`;
                        
                        formula += `<span class="h5">Costo</span>: \$${cashFormat((horaHombre * (horas * dias * semanas * meses)) + gastosExtras)} + <span class="h5">Beneficio</span>: \$${cashFormat(((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio)}`;

                        total = ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) + ((horaHombre * (horas * dias * semanas * meses)) + gastosExtras) * porcentajeBeneficio;
                    }
                    break;
                default:
                    error.push('Error, al configurar el tipo de la cantidad de trabajo');
            }        

            if(!isNaN(total) && error.length === 0) {
                // Método(formula Math) utilizado
                metodo.innerHTML = '<span class=" h4 font-weight-bold mb-2">Cálculos realizados:</span><hr>' + formula;
                resultado.className += ' h2';
                resultado.innerHTML = `Total: \$${cashFormat(total)}`;
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