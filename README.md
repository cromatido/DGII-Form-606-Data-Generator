# DGII-Form-606-Data-Generator
## 2.0v - Interfaz Moderna

<p>El Generador de Datos del Formulario 606 DGII es una herramienta moderna y fácil de usar diseñada para agilizar el proceso de generación y registro de datos para el Formulario 606 de la Dirección General de Impuestos Internos (DGII) de la República Dominicana. Esta herramienta permite a los usuarios ingresar detalles de facturas de manera eficiente e intuitiva, y luego convierte automáticamente los datos ingresados en un archivo CSV descargable que se ajusta al formato requerido para los reportes de la DGII.</p>

## 🚀 Nuevas Características (v2.0)

### **Interfaz Moderna y Responsiva**
- **Diseño Web Moderno**: Interfaz completamente rediseñada con gradientes, sombras y animaciones suaves
- **Responsive Design**: Funciona perfectamente en dispositivos móviles, tablets y computadoras
- **Tabla Interactiva**: Visualización clara de todos los datos ingresados en formato de tabla
- **Modal Intuitivo**: Formulario de entrada de datos en ventana modal para mejor experiencia de usuario

### **Funcionalidades Mejoradas**
- **Entrada de Datos Simplificada**: Formulario estructurado con campos específicos para cada tipo de dato
- **Cálculos Automáticos**: El total facturado se calcula automáticamente al sumar servicios y bienes
- **Validación de Campos**: Verificación automática de campos requeridos antes de guardar
- **Estadísticas en Tiempo Real**: Contador de líneas totales y monto total acumulado
- **Gestión de Datos**: Posibilidad de eliminar líneas individuales o limpiar todos los datos

### **Experiencia de Usuario Mejorada**
- **Botones con Iconos**: Interfaz más visual con emojis y iconos descriptivos
- **Estados Vacíos Informativos**: Mensajes claros cuando no hay datos ingresados
- **Confirmaciones**: Diálogos de confirmación para acciones destructivas
- **Navegación Intuitiva**: Flujo de trabajo simplificado y lógico

## 📋 Características Originales Mantenidas

- **Generación Eficiente de Datos**: El programa permite a los usuarios ingresar datos de facturas de manera continua sin interrupciones
- **Formato Automatizado**: Al capturar datos en un formato específico y convertirlos en un archivo CSV, el programa asegura que los datos cumplan con los requisitos de la DGII
- **Creación Automática de CSV**: La función de generar automáticamente un archivo CSV al completar el proceso agiliza el envío de información a las autoridades fiscales
- **Registro Estructurado**: El archivo CSV final contiene todas las facturas ingresadas, organizadas en formato tabular que coincide con los campos requeridos del Formulario 606
- **Reducción de Errores**: Al proporcionar una interfaz intuitiva y automatizada, la herramienta ayuda a reducir errores de entrada de datos

## 🎯 Cómo Usar

1. **Abrir la Aplicación**: Ejecuta `main.html` en tu navegador web
2. **Agregar Líneas**: Haz clic en "➕ Agregar Línea" para abrir el formulario de entrada
3. **Completar Datos**: Llena los campos requeridos en el modal:
   - RNC (Requerido)
   - NCF (Requerido)
   - Bienes y Servicios (Requerido)
   - Montos de Servicios y Bienes
   - ITBS y otros impuestos
   - Forma de Pago (Requerido)
4. **Guardar**: Haz clic en "Guardar Línea" para agregar los datos a la tabla
5. **Revisar**: Los datos aparecerán en la tabla con estadísticas actualizadas
6. **Descargar**: Usa "📥 Descargar CSV" para obtener el archivo final

## 📊 Campos del Formulario

### Campos Requeridos:
- **RNC**: Número de Registro Nacional del Contribuyente
- **NCF**: Número de Comprobante Fiscal
- **Bienes y Servicios**: Categoría de gasto según clasificación DGII
- **Forma de Pago**: Método de pago utilizado

### Campos Opcionales:
- **Monto Facturado en Servicios**: Valor de servicios facturados
- **Monto Facturado en Bienes**: Valor de bienes facturados
- **ITBS Facturado**: Impuesto sobre Transferencias de Bienes Industrializados y Servicios
- **ITBS Retenido**: ITBS retenido por el comprador
- **Monto Retención Renta**: Retención de impuesto sobre la renta

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **CSS3**: Estilos avanzados con gradientes, flexbox y grid
- **JavaScript ES6+**: Lógica de aplicación moderna
- **Responsive Design**: Adaptable a todos los dispositivos

## 📁 Estructura del Proyecto

```
DGII-Form-606-Data-Generator/
├── main.html          # Interfaz principal de la aplicación
├── generatorLine.js   # Lógica de generación de datos
└── README.md         # Documentación del proyecto
```

## 🎨 Características de Diseño

- **Paleta de Colores**: Gradientes modernos en tonos azules y púrpuras
- **Tipografía**: Fuentes sans-serif modernas y legibles
- **Animaciones**: Transiciones suaves y efectos hover
- **Iconografía**: Emojis y símbolos para mejor comprensión visual

## 🔄 Versiones

### v2.0 (Actual)
- Interfaz completamente rediseñada
- Modal para entrada de datos
- Tabla interactiva con estadísticas
- Diseño responsive
- Validación mejorada

### v0.1 (Original)
- Interfaz básica con prompts
- Funcionalidad core de generación CSV
- Lógica de datos original

## 📝 Notas de Desarrollo

Esta versión mantiene toda la lógica original del generador de datos del Formulario 606, pero presenta una interfaz completamente renovada que mejora significativamente la experiencia del usuario. Los datos generados siguen siendo compatibles con los requisitos de la DGII.
