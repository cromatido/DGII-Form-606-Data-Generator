let arrayOfArrays = [];

function arraysToCSV(arrays, filename) {
    const csvContent = arrays.map(row => row.join(';')).join('\n');
    const csvData = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

let space;
let rnc;
let id;
let goods_services;
let ncf;
let ncf_modified;
let year_month;
let date_day;
let nulled;
let nulled2;
let services;
let goods;
let total_invoiced_amount
let itbs
let itbs_detained
let itbs_art349
let itbs_cost
let itbs_ahead
let itbs_purchases
let income_tax_type
let isr_income
let isr_purchases
let selective_tax
let others_taxes
let legal_tip
let payment

const factureLine = [space, rnc,
    id,
    goods_services,
    ncf,
    ncf_modified,
    year_month,
    date_day,
    nulled,
    nulled2,
    services,
    goods,
    total_invoiced_amount,
    itbs,
    itbs_detained,
    itbs_art349,
    itbs_cost,
    itbs_ahead,
    itbs_purchases,
    income_tax_type,
    isr_income,
    isr_purchases,
    selective_tax,
    others_taxes,
    legal_tip,
    payment]

const bienes_servicios_obj = {
    "1": "01-GASTOS DE PERSONAL",
    "2": "02-GASTOS POR TRABAJOS, SUMINISTROS Y SERVICIOS",
    "3": "03-ARRENDAMIENTOS",
    "4": "04-GASTOS DE ACTIVOS FIJO",
    "5": "05 -GASTOS DE REPRESENTACIÓN",
    "6": "06 -OTRAS DEDUCCIONES ADMITIDAS",
    "7": "07 -GASTOS FINANCIEROS",
    "8": "08 -GASTOS EXTRAORDINARIOS",
    "9": "09 -COMPRAS Y GASTOS QUE FORMARAN PARTE DEL COSTO DE VENTA ",
    "10": "10 -ADQUISICIONES DE ACTIVOS ",
    "11": "11- GASTOS DE SEGUROS"
}

const bienes_servicios_map = new Map(Object.entries(bienes_servicios_obj));

const forma_de_pago = {
    1: "01 - EFECTIVO",
    2: "02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO",
    3: "03 - TARJETA CRÉDITO/DÉBITO",
    4: "04 - COMPRA A CREDITO",
    5: "05 - PERMUTA",
    6: "06 - NOTA DE CREDITO",
    7: "07 - MIXTO",
}

const forma_de_pago_map = new Map(Object.entries(forma_de_pago));

const nombres = {
    0: " ",
    1: "Rnc",
    2: "Id",
    3: "Bienes y servicios",
    4: "Ncf",
    5: "Ncf o Documento modificado",
    6: "Año/mes",
    7: "Dia",
    8: "Fecha pago",
    9: "Fecha pago 2",
    10: "Monto Facturado en Servicios",
    11: "Monto Facturado en Bienes",
    12: "Total Monto Facturado",
    13: "ITBS Facturado",
    14: "ITBS Retenido",
    15: "ITBS sujeto a Proporcionalidad (Art. 349)",
    16: "ITBS llevado al costo",
    17: "ITBS por Adelantar",
    18: "ITBS percibido en compras",
    19: "Tipo de Retencion en ISR",
    20: "Monto Retencion Renta",
    21: "ISR Percibido en compras",
    22: "Impuesto Selectivo al Consumo",
    23: "Otros Impuesto/Tasas",
    24: "Monto Propina Legal",
    25: "Forma de pago"
}

const config = [0, 2, 5, 6, 8, 9, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
const dateFacture = "202302"


function lineGenerator(config, dateFacture) {
    const newLine = []
    let i = 1
    id = 1

    while(i < factureLine.length) {
        if (!config.includes(i)) {
            if (i === 3) {
                const opcion = (prompt(`Elige la opción numérica de bienes y servicios:\n${Object.entries(bienes_servicios_obj).map(([key, value]) => `${key} - ${value}`).join('\n')}`))

                if (opcion !== null) {
                    if (bienes_servicios_map.has(opcion)) {
                        const value = bienes_servicios_map.get(opcion);
                        newLine.push(value);
                    }
                } else {
                    console.log("Opción inválida");
                }

            } else if (i === 10 || i === 11) {
                const evaluate = prompt(`Inserta ${nombres[i]}`)
                if (evaluate != null) {
                    const result = eval(evaluate)
                    newLine.push(result)
                }
            }
            else if (i === 25) {
                const opcion = (prompt(`Elige la opción numérica de forma de pago:\n${Object.entries(forma_de_pago).map(([key, value]) => `${key} - ${value}`).join('\n')}`))

                if (opcion !== null) {
                    if (forma_de_pago_map.has(opcion)) {
                        const value = forma_de_pago_map.get(opcion);
                        newLine.push(value);
                    }
                } else {
                    console.log("Opción inválida");
                }
            } else {
                newLine.push(prompt(`Inserta ${nombres[i]}`))
            }

        } else if (config.includes(i)) {
            if(i === 2){
                newLine.push(id)
            }
            if(i === 6){
                newLine.push(dateFacture)
            } else{
                newLine.push(" ")
            }
        }
        i++
    }

    return newLine;
}

document.getElementById("startButton").addEventListener("click", function () {
    let final = "no";


    while (final.toLowerCase() !== "si") {
        const newRow = lineGenerator(config, dateFacture);
        arrayOfArrays.push(newRow);
        final = prompt("¿Finalizar? (Sí/No)");
    }


    arraysToCSV(arrayOfArrays, "datos.csv");
});

document.getElementById("logButton").addEventListener("click", function () {

    arraysToCSV(arrayOfArrays, "datos.csv");
});

document.getElementById("clearLog").addEventListener("click", function () {
    arrayOfArrays = []
});
