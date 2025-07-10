// Variables globales
let arrayOfArrays = [];
let currentRowId = 1;

// Configuración original
const config = [0, 2, 5, 6, 8, 9, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const dateFacture = "202302";

// Objetos de mapeo originales
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
};

const forma_de_pago = {
    1: "01 - EFECTIVO",
    2: "02 - CHEQUES/TRANSFERENCIAS/DEPÓSITO",
    3: "03 - TARJETA CRÉDITO/DÉBITO",
    4: "04 - COMPRA A CREDITO",
    5: "05 - PERMUTA",
    6: "06 - NOTA DE CREDITO",
    7: "07 - MIXTO",
};

// Función para convertir arrays a CSV (mantenida del código original)
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

// Función para generar línea de datos (adaptada del código original)
function generateDataLine(formData) {
    const newLine = [];
    
    // Generar array con 26 elementos (como en el código original)
    for (let i = 0; i < 26; i++) {
        if (!config.includes(i)) {
            switch (i) {
                case 1: // RNC
                    newLine.push(formData.rnc || " ");
                    break;
                case 3: // Bienes y servicios
                    newLine.push(formData.goodsServices || " ");
                    break;
                case 4: // NCF
                    newLine.push(formData.ncf || " ");
                    break;
                case 7: // Día
                    newLine.push(formData.day || " ");
                    break;
                case 10: // Monto Facturado en Servicios
                    newLine.push(parseFloat(formData.servicesAmount) || 0);
                    break;
                case 11: // Monto Facturado en Bienes
                    newLine.push(parseFloat(formData.goodsAmount) || 0);
                    break;
                case 13: // ITBS Facturado
                    newLine.push(parseFloat(formData.itbs) || 0);
                    break;
                case 14: // ITBS Retenido
                    newLine.push(parseFloat(formData.itbsDetained) || 0);
                    break;
                case 20: // Monto Retención Renta
                    newLine.push(parseFloat(formData.isrIncome) || 0);
                    break;
                case 25: // Forma de pago
                    newLine.push(formData.paymentMethod || " ");
                    break;
                default:
                    newLine.push(" ");
            }
        } else {
            if (i === 2) {
                newLine.push(currentRowId);
            } else if (i === 6) {
                newLine.push(dateFacture);
            } else {
                newLine.push(" ");
            }
        }
    }
    
    return newLine;
}

// Función para actualizar estadísticas
function updateStats() {
    const totalRows = arrayOfArrays.length;
    const totalAmount = arrayOfArrays.reduce((sum, row) => {
        return sum + (parseFloat(row[12]) || 0); // Total Monto Facturado está en índice 12
    }, 0);
    
    document.getElementById('totalRows').textContent = totalRows;
    document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Función para actualizar la tabla
function updateTable() {
    const tableBody = document.getElementById('tableBody');
    
    if (arrayOfArrays.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" class="empty-state">
                    <h3>No hay datos ingresados</h3>
                    <p>Haz clic en "Agregar Línea" para comenzar a ingresar datos</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = arrayOfArrays.map((row, index) => `
        <tr>
            <td>${row[2] || index + 1}</td>
            <td>${row[1] || ''}</td>
            <td>${row[3] || ''}</td>
            <td>${row[4] || ''}</td>
            <td>$${(parseFloat(row[10]) || 0).toFixed(2)}</td>
            <td>$${(parseFloat(row[11]) || 0).toFixed(2)}</td>
            <td>$${(parseFloat(row[12]) || 0).toFixed(2)}</td>
            <td>$${(parseFloat(row[13]) || 0).toFixed(2)}</td>
            <td>${row[25] || ''}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteRow(${index})" style="padding: 5px 10px; font-size: 12px;">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

// Función para eliminar fila
function deleteRow(index) {
    if (confirm('¿Estás seguro de que quieres eliminar esta línea?')) {
        arrayOfArrays.splice(index, 1);
        updateTable();
        updateStats();
    }
}

// Función para calcular total automáticamente
function calculateTotal() {
    const servicesAmount = parseFloat(document.getElementById('servicesAmount').value) || 0;
    const goodsAmount = parseFloat(document.getElementById('goodsAmount').value) || 0;
    const total = servicesAmount + goodsAmount;
    document.getElementById('totalAmount').value = total.toFixed(2);
}

// Función para abrir modal
function openModal() {
    document.getElementById('dataModal').style.display = 'block';
    document.getElementById('dataForm').reset();
    document.getElementById('totalAmount').value = '0.00';
}

// Función para cerrar modal
function closeModal() {
    document.getElementById('dataModal').style.display = 'none';
}

// Función para guardar datos del formulario
function saveFormData() {
    const form = document.getElementById('dataForm');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    const rnc = formData.get('rnc');
    const ncf = formData.get('ncf');
    const goodsServices = formData.get('goodsServices');
    const paymentMethod = formData.get('paymentMethod');
    
    if (!rnc || !ncf || !goodsServices || !paymentMethod) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Crear objeto con los datos del formulario
    const data = {
        rnc: rnc,
        ncf: ncf,
        goodsServices: goodsServices,
        servicesAmount: formData.get('servicesAmount'),
        goodsAmount: formData.get('goodsAmount'),
        itbs: formData.get('itbs'),
        itbsDetained: formData.get('itbsDetained'),
        isrIncome: formData.get('isrIncome'),
        paymentMethod: paymentMethod,
        day: new Date().getDate().toString().padStart(2, '0')
    };
    
    // Generar línea de datos usando la lógica original
    const newLine = generateDataLine(data);
    arrayOfArrays.push(newLine);
    
    // Actualizar interfaz
    updateTable();
    updateStats();
    closeModal();
    
    // Incrementar ID para la siguiente línea
    currentRowId++;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botón para agregar línea
    document.getElementById('addRowBtn').addEventListener('click', openModal);
    
    // Botón para descargar CSV
    document.getElementById('downloadBtn').addEventListener('click', function() {
        if (arrayOfArrays.length === 0) {
            alert('No hay datos para descargar');
            return;
        }
        arraysToCSV(arrayOfArrays, "formulario_606_dgii.csv");
    });
    
    // Botón para descargar log (mantiene funcionalidad original)
    document.getElementById('downloadLogBtn').addEventListener('click', function() {
        if (arrayOfArrays.length === 0) {
            alert('No hay datos para descargar');
            return;
        }
        arraysToCSV(arrayOfArrays, "datos.csv");
    });
    
    // Botón para limpiar datos
    document.getElementById('clearBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
            arrayOfArrays = [];
            currentRowId = 1;
            updateTable();
            updateStats();
        }
    });
    
    // Modal controls
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('saveBtn').addEventListener('click', saveFormData);
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('dataModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Calcular total automáticamente cuando cambien los montos
    document.getElementById('servicesAmount').addEventListener('input', calculateTotal);
    document.getElementById('goodsAmount').addEventListener('input', calculateTotal);
    
    // Inicializar estadísticas
    updateStats();
});
