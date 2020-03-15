(function(){
    const formulario = document.getElementById('formulario');
    const resultado = document.getElementById('resultado');
    const metodo = document.getElementById('metodo');    
    let tipo = ""; 
    let error = "";
    let total = 0;
    let message = "";

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
                            error = 'Seleccione un campo!!';
                    }
                }       
            }
        }    
    }

    if(formulario)
    {
        cargar();

        formulario.onsubmit = (e) => {
            e.preventDefault();

            const horaHombre = comeBackCash(document.getElementById('txtHoraHombre').value);
            const meses = Number(document.getElementById('txtMeses').value);            
            const semanas = Number(document.getElementById('txtSemanas').value);
            const dias = Number(document.getElementById('txtDias').value);
            const horas = Number(document.getElementById('txtHoras').value);
            const gastosExtras = comeBackCash(document.getElementById('txtGastosExtras').value);

            // Futuro input text
            const porcentajeBeneficio = parseFloat(document.getElementById('ddlBeneficio').value);

            // Método utilizado
            metodo.innerHTML = '<span class=" h4 font-weight-bold">Cálculos realizados:</span><br>';

            switch (tipo) {
                case 'horas':
                    if(gastosExtras) {
                        total = ((horaHombre * horas) + gastosExtras) + ((horaHombre * horas) + gastosExtras) * porcentajeBeneficio;
                        metodo.innerHTML += '((Valor por Hora * Cantidad de Horas) + Gastos Extras) + ((Valor por Hora * Cantidad de Horas) + Gastos Extras) * Porcentaje del beneficio';
                    } else {
                        total = (horaHombre * horas) + (horaHombre * horas) * porcentajeBeneficio;
                        metodo.innerHTML += '(Valor por Hora * Cantidad de Horas) + (Valor por Hora * Cantidad de Horas) * Porcentaje del beneficio';
                    }
                    break;
                case 'días':
                    if(gastosExtras) {
                        total = ((horaHombre * (horas * dias)) + gastosExtras) + ((horaHombre * (horas * dias)) + gastosExtras) * porcentajeBeneficio;
                        metodo.innerHTML += '((Valor por Hora * (Cantidad de Horas * Días)) + Gastos Extras) + ((Valor por Hora * (Cantidad de Horas * Días)) + Gastos Extras) * Porcentaje del beneficio';
                    } else {
                        total = (horaHombre * (horas * dias)) + (horaHombre * (horas * dias)) * porcentajeBeneficio;
                        metodo.innerHTML += '(Valor por Hora * (Cantidad de Horas * Días)) + (Valor por Hora * (Cantidad de Horas * Días)) * Porcentaje del beneficio';
                    }
                    break;
                case 'semanas':
                    if(gastosExtras) {
                        total = (horaHombre * (horas * dias * semanas)) + gastosExtras + (horaHombre * (horas * dias * semanas)) * porcentajeBeneficio;
                        metodo.innerHTML += '((Valor por Hora * ((Cantidad de Horas * Días) * Semanas)) + Gastos Extras) + ((Valor por Hora * ((Cantidad de Horas * Días) * Semanas)) + Gastos Extras) * Porcentaje del beneficio';
                    } else {
                        total = (horaHombre * (horas * dias * semanas)) + (horaHombre * (horas * dias * semanas)) * porcentajeBeneficio;
                        metodo.innerHTML += '(Valor por Hora * ((Cantidad de Horas * Días) * Semanas)) + (Valor por Hora * ((Cantidad de Horas * Días) * Semanas)) * Porcentaje del beneficio';
                    }
                    break;
                case 'meses':
                    if(gastosExtras) {
                        total = (horaHombre * (horas * dias * semanas * meses)) + gastosExtras + (horaHombre * (horas * dias * semanas * meses)) * porcentajeBeneficio;
                        metodo.innerHTML += '((Valor por Hora * (((Cantidad de Horas * Días) * Semanas) * Meses )) + Gastos Extras) + ((Valor por Hora * (((Cantidad de Horas * Días) * Semanas) * Meses )) + Gastos Extras) * Porcentaje del beneficio';
                    } else {
                        total = (horaHombre * (horas * dias * semanas * meses)) + (horaHombre * (horas * dias * semanas * meses)) * porcentajeBeneficio;
                        metodo.innerHTML += '(Valor por Hora * (((Cantidad de Horas * Días) * Semanas) * Meses )) + (Valor por Hora * (((Cantidad de Horas * Días) * Semanas) * Meses )) * Porcentaje del beneficio';
                    }
                    break;
                default:
                    error = "Error, al configurar el tipo de la cantidad de trabajo";
            }

            if(!isNaN(total)) {
                resultado.innerHTML = `Total: \$${cashFormat(total)}`;
                window.location.hash = '#resultado'; // <-- Focus
            } else {
                alert(error); // Crear alert
            }
        }
    }
})();