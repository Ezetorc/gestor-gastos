// Importaciones necesarias para el componente
import { Typography } from '@mui/material'; // Componente de texto de Material-UI
import {
  LineChart, // Componente principal del gráfico de líneas
  lineElementClasses, // Clases CSS para personalizar las líneas
  markElementClasses, // Clases CSS para personalizar los puntos marcadores
} from '@mui/x-charts/LineChart'; // Librería de gráficos de MUI

// Configuración de márgenes para el gráfico
const margin = { right: 24 }; // Margen derecho para evitar que la leyenda se corte

// Interface que define la estructura de cada elemento de datos (gasto o ingreso)
interface DataItem {
  id: number;          // Identificador único
  amount: number;      // Monto (positivo para ingresos, puede ser positivo para gastos)
  date: string;        // Fecha en formato ISO string
  category: string;    // Categoría del gasto/ingreso
  description: string; // Descripción del movimiento
  user_id: number;     // ID del usuario propietario
}

// Interface que define las props que recibe este componente desde Dashboard
interface DashedLineChartProps {
  expenses: DataItem[]; // Array de gastos
  incomes: DataItem[];  // Array de ingresos
}

/**
 * processData - Función que procesa los datos raw para el gráfico de líneas
 * 
 * Funcionalidad:
 * 1. Extrae todas las fechas únicas de gastos e ingresos
 * 2. Ordena las fechas cronológicamente
 * 3. Calcula totales diarios para gastos e ingresos
 * 4. Retorna estructura de datos lista para el gráfico
 */
const processData = (expenses: DataItem[], incomes: DataItem[]) => {
  // PASO 1: Extraer fechas únicas y ordenarlas
  // Combina fechas de gastos e ingresos, elimina duplicados con Set, y ordena
  const allDates = [
    ...new Set([ // Set elimina fechas duplicadas
      ...expenses.map((e) => e.date.split('T')[0]), // Extrae solo la parte de fecha (YYYY-MM-DD)
      ...incomes.map((i) => i.date.split('T')[0]),  // Extrae solo la parte de fecha (YYYY-MM-DD)
    ]),
  ].sort(); // Ordena fechas cronológicamente

  // PASO 2: Calcular gastos diarios
  // Para cada fecha, suma todos los gastos de ese día
  const dailyExpenses = allDates.map((date) => {
    return expenses
      .filter((e) => e.date.split('T')[0] === date) // Filtra gastos de la fecha específica
      .reduce((sum, e) => sum + e.amount, 0); // Suma todos los montos de esa fecha
  });

  // PASO 3: Calcular ingresos diarios
  // Para cada fecha, suma todos los ingresos de ese día
  const dailyIncomes = allDates.map((date) => {
    return incomes
      .filter((i) => i.date.split('T')[0] === date) // Filtra ingresos de la fecha específica
      .reduce((sum, i) => sum + i.amount, 0); // Suma todos los montos de esa fecha
  });

  // RETORNO: Estructura de datos optimizada para el gráfico
  return {
    labels: allDates,        // Etiquetas del eje X (fechas)
    expenses: dailyExpenses, // Datos para la línea de gastos
    incomes: dailyIncomes,   // Datos para la línea de ingresos
  };
};

/**
 * DashedLineChart - Componente que renderiza gráfico de líneas con tendencias
 * 
 * Funcionalidad:
 * 1. Recibe arrays de gastos e ingresos desde Dashboard
 * 2. Procesa los datos para agrupar por fecha
 * 3. Renderiza gráfico con dos líneas: ingresos (línea punteada) y gastos (línea discontinua)
 * 4. Aplica estilos personalizados coherentes con el tema
 */
export default function DashedLineChart({ expenses, incomes }: DashedLineChartProps) {
  // Procesar datos raw para convertirlos en formato del gráfico
  const chartData = processData(expenses, incomes);
  
  // RENDERIZADO del gráfico de líneas con configuración completa
  return (
    <>
      {/* Título del gráfico */}
      <Typography sx={{ textAlign: 'center', mt: 2 }}>Tendencia</Typography>
      
      {/* Componente principal del gráfico de líneas */}
      <LineChart
        height={300} // Altura fija del gráfico
        
        // CONFIGURACIÓN DE SERIES - Define las dos líneas del gráfico
        series={[
          { 
            data: chartData.incomes,   // Datos procesados de ingresos diarios
            label: 'Ingresos',         // Etiqueta para la leyenda
            id: 'incomesId'            // ID único para aplicar estilos específicos
          },
          { 
            data: chartData.expenses,  // Datos procesados de gastos diarios
            label: 'Egresos',          // Etiqueta para la leyenda
            id: 'expensesId'           // ID único para aplicar estilos específicos
          },
        ]}
        
        // CONFIGURACIÓN EJE X - Fechas como puntos discretos
        xAxis={[{ 
          scaleType: 'point',      // Escala de puntos discretos (no continua)
          data: chartData.labels   // Fechas procesadas como etiquetas
        }]}
        
        // CONFIGURACIÓN EJE Y - Valores monetarios
        yAxis={[{ width: 50 }]} // Ancho del área del eje Y para los números
        
        // ESTILOS PERSONALIZADOS - Coherentes con el tema oscuro
        sx={{
          // Estilo general para líneas y marcadores - grosor de línea
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 1, // Líneas delgadas para mejor visualización
          },
          
          // LÍNEA DE INGRESOS - Patrón de línea punteada (5px línea, 5px espacio)
          [`.${lineElementClasses.root}[data-series="incomesId"]`]: {
            strokeDasharray: '5 5', // Patrón regular para ingresos
          },
          
          // LÍNEA DE GASTOS - Patrón de línea más complejo (3px-4px-5px-2px)
          [`.${lineElementClasses.root}[data-series="expensesId"]`]: {
            strokeDasharray: '3 4 5 2', // Patrón irregular para distinguir gastos
          },
          
          // MARCADORES NORMALES - Puntos blancos para visibilidad en fondo oscuro
          [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
            color: '#fff', // Color blanco para contraste
          },
          
          // MARCADORES RESALTADOS - Sin borde cuando están seleccionados
          [`& .${markElementClasses.highlighted}`]: {
            stroke: 'none', // Elimina borde en hover/selección
          },
          
          // LEYENDA - Texto blanco y en negrita para legibilidad
          [`& .MuiChartsLegend-label`]: {
            color: 'white',      // Texto blanco para tema oscuro
            fontWeight: 'bold',  // Negrita para mejor legibilidad
          },
          
          // EJES - Colores blancos para visibilidad en fondo oscuro
          '& .MuiChartsAxis-line': {
            stroke: '#fff', // Líneas de los ejes en blanco
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#fff', // Etiquetas de los ejes en blanco
          },
          '& .MuiChartsAxis-tick': {
            stroke: '#fff', // Marcas de los ejes en blanco
          },
          
          // GRILLA - Líneas de cuadrícula sutiles para ayudar en la lectura
          '& .MuiChartsAxis-gridLine': {
            stroke: '#fff',        // Color blanco para las líneas de grilla
            strokeOpacity: 0.3,    // Opacidad baja para que no distraigan
          },
        }}
        margin={margin} // Aplica los márgenes definidos al inicio
      />
    </>
  );
}
