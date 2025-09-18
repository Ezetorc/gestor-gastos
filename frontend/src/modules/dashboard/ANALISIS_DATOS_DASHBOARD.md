# Análisis del Procesamiento de Datos del Dashboard

Este documento detalla cómo se procesan los datos provenientes de los archivos `mock` para ser utilizados en los diferentes componentes del Dashboard. La lógica principal de transformación de datos se encuentra centralizada en los `hooks` de React, específicamente dentro de `src/modules/dashboard/hooks`.

## 1. Origen de los Datos (Mocks)

Los datos crudos provienen de dos archivos principales:

-   `src/modules/dashboard/mocks/expenses.mock.json`: Contiene un array de objetos, donde cada objeto representa un gasto con la siguiente estructura:
    ```json
    {
      "id": "1",
      "name": "Café",
      "amount": 5,
      "date": "2024-07-22",
      "category": "Comida"
    }
    ```
-   `src/modules/dashboard/mocks/incomes.mock.json`: Similar al de gastos, contiene un array de objetos que representan ingresos.

Estos datos son la fuente principal para todas las visualizaciones y cálculos en el dashboard.

## 2. Lógica de Procesamiento (Hooks)

Para transformar los datos crudos en información útil para los gráficos y tarjetas, se utilizan dos hooks personalizados.

### a. Agrupación por Categoría (`useExpensesByCategory.ts`)

-   **Propósito**: Sumar el total de gastos para cada categoría existente.
-   **Lógica**:
    1.  Recibe el array de todos los gastos (`expenses.mock.json`).
    2.  Crea un objeto o mapa para usarlo como acumulador.
    3.  Itera sobre cada gasto del array.
    4.  Por cada gasto, utiliza el campo `category` como clave en el objeto acumulador.
    5.  Suma el `amount` del gasto al valor existente para esa categoría. Si la categoría no existe en el acumulador, la inicializa con el `amount` del gasto actual.
-   **Resultado**: Devuelve un array de objetos, donde cada objeto contiene el nombre de la categoría y el total gastado en ella.
    -   **Dato de entrada (ejemplo)**: `[{ amount: 10, category: 'Comida' }, { amount: 20, category: 'Transporte' }, { amount: 5, category: 'Comida' }]`
    -   **Dato de salida (ejemplo)**: `[{ category: 'Comida', total: 15 }, { category: 'Transporte', total: 20 }]`

### b. Agrupación por Día (`useDailyExpensesIncomes.ts`)

-   **Propósito**: Calcular el total de ingresos y gastos para cada uno de los últimos 7 días.
-   **Lógica**:
    1.  Recibe tanto los ingresos (`incomes.mock.json`) como los gastos (`expenses.mock.json`).
    2.  Define un período de tiempo (los últimos 7 días a partir de la fecha actual).
    3.  Crea una estructura de datos (generalmente un array o un mapa) para almacenar los totales de cada día.
    4.  Itera sobre los gastos y los ingresos. Para cada transacción, comprueba si su `date` está dentro del período de los últimos 7 días.
    5.  Si la transacción está en el rango, extrae el día (por ejemplo, "lun.", "mar.") y suma el `amount` al total de `incomes` o `expenses` correspondiente a ese día.
-   **Resultado**: Devuelve una estructura de datos lista para ser consumida por un gráfico de líneas, generalmente un array de objetos donde cada objeto representa un día y contiene los totales de ingresos y gastos.
    -   **Dato de salida (ejemplo)**: `[{ day: 'lun', expenses: 50, incomes: 100 }, { day: 'mar', expenses: 25, incomes: 0 }]`

## 3. Implementación en el Dashboard

La lógica de los hooks se aplica de manera selectiva en los componentes del dashboard.

### Componentes que SÍ utilizan esta lógica de agrupación:

1.  **`DashedLineChart.tsx`**:
    -   **Hook utilizado**: `useDailyExpensesIncomes`.
    -   **Aplicación**: Utiliza los datos agrupados por día para renderizar un gráfico de líneas que muestra la tendencia de ingresos y gastos a lo largo de la última semana. Cada punto en el gráfico representa el total de un día.

2.  **`PiesChart/PieChart.tsx`**:
    -   **Hook utilizado**: `useExpensesByCategory`.
    -   **Aplicación**: Toma los gastos totales por categoría para generar un gráfico de pastel. Cada "porción" del pastel representa una categoría y su tamaño es proporcional al total gastado en ella.

3.  **`TopCategoriesCard.tsx`**:
    -   **Hook utilizado**: `useExpensesByCategory`.
    -   **Aplicación**: Muestra una lista de las categorías en las que más se ha gastado. Ordena los datos devueltos por el hook de mayor a menor y presenta las primeras (por ejemplo, el top 5).

### Componentes que NO utilizan esta lógica de agrupación:

1.  **`Totals.tsx`** y **`TotalsBalanceCard.tsx`**:
    -   **Lógica**: Estos componentes no necesitan datos agrupados por día o categoría.
    -   **Aplicación**: Calculan valores totales simples. Por ejemplo, para obtener el "Total de Gastos", simplemente iteran sobre el array crudo de `expenses.mock.json` y suman todos los `amount` usando una función `.reduce()`. Lo mismo ocurre con el total de ingresos y el balance (ingresos - gastos).

2.  **`Summary.tsx`** y **`SummaryStatCard.tsx`**:
    -   **Lógica**: Al igual que los componentes de totales, realizan cálculos directos sobre los datos crudos.
    -   **Aplicación**: Para calcular el "Gasto Promedio" o el "Gasto Máximo", operan directamente sobre el array de gastos sin necesidad de la lógica de agrupación de los hooks.

## Resumen

En conclusión, los **hooks** actúan como procesadores de datos que los transforman y agrupan para visualizaciones complejas (`DashedLineChart`, `PieChart`). Otros componentes que solo muestran métricas agregadas (`Totals`, `Summary`) realizan sus propios cálculos simples directamente desde los datos mock, ya que no requieren la data segmentada por día o categoría.


## ACLARACION IMPORTANTE
todo lo que no se implemento citado antes, es que presisa una implementacion cruda que seria un pedido directo por dia a la api, deberia ser similar a como se estaba planteando