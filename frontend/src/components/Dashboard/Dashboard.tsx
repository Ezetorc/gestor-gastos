// Importaciones de componentes de Material-UI para layout y diseño
import { Box, Card } from '@mui/material';

// Subcomponentes del dashboard que muestran diferentes visualizaciones
import { theme } from "@/constants/theme"; // Tema personalizado con colores
import { Summary } from './subcomponents/Summary'; // Tarjetas de resumen con estadísticas rápidas
import { Totals } from './subcomponents/Totals'; // Componente de totales y balance
import { PieChartComponent } from './subcomponents/PieChart'; // Gráfico circular para gastos por categoría
import DashedLineChart from './subcomponents/DashedLineChart'; // Gráfico de líneas para tendencias

// Datos mock importados directamente (en producción vendrían de una API)
import expenses from '../../mocks/expenses.mock.json'; // Array de gastos de ejemplo
import incomes from '../../mocks/incomes.mock.json'; // Array de ingresos de ejemplo

export const Dashboard = () => {
  // CÁLCULOS AUTOMÁTICOS - Se ejecutan cada vez que el componente se renderiza
  
  // Calcular total de gastos sumando todos los montos del array expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calcular total de ingresos sumando todos los montos del array incomes
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  
  // Calcular balance (diferencia entre ingresos y gastos)
  const balance = totalIncomes - totalExpenses;

  // ESTRUCTURA DE DATOS - Objeto que organiza todos los datos para los subcomponentes
  const dashboardData = {
    // Datos originales sin modificar para los gráficos
    expenses, // Array completo de gastos para PieChart y DashedLineChart
    incomes,  // Array completo de ingresos para DashedLineChart
    
    // Datos calculados para las tarjetas de resumen (Summary component)
    summary: {
      gastosHoy: -15000, // Valor simulado - en producción vendría de API filtrada por fecha
      gastoSemana: -25000, // Valor simulado - en producción vendría de API filtrada por semana
      gastoMes: -totalExpenses, // Calculado real: total de gastos del mes (negativo por convención)
      balance: balance, // Balance actual calculado (ingresos - gastos)
    },
    
    // Datos calculados para el componente de totales (Totals component)
    totals: {
      totalGastos: -totalExpenses, // Total de gastos (negativo por convención contable)
      totalIngresos: totalIncomes, // Total de ingresos (positivo)
      balanceResumen: balance, // Mismo balance pero para el componente Totals
    },
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
          }}
        >
          <Summary 
            gastosHoy={dashboardData.summary.gastosHoy}
            gastoSemana={dashboardData.summary.gastoSemana}
            gastoMes={dashboardData.summary.gastoMes}
            balance={dashboardData.summary.balance}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%',
          }}
        >
          <Totals 
            totalGastos={dashboardData.totals.totalGastos}
            totalIngresos={dashboardData.totals.totalIngresos}
            balance={dashboardData.totals.balanceResumen}
            expenses={dashboardData.expenses}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '70%',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ 
              width: { xs: '100%', md: '50%' },
           }}>
            <Card sx={{ 
              height: '100%',
              background: theme.colors.inputBg,
              color:'white',
              borderRadius:'10px'
            }}>
              <PieChartComponent expenses={dashboardData.expenses} />
            </Card>
          </Box>
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
          }}>
            <Card sx={{ 
              height: '100%',
              background: theme.colors.inputBg,
              color:'white',
              borderRadius:'10px'
            }}>
              <DashedLineChart 
                expenses={dashboardData.expenses}
                incomes={dashboardData.incomes}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};