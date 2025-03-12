/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  ColDef,
  ColGroupDef,
  ValueGetterParams,
  ValueFormatterParams,
  CellClassParams
} from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { storesData } from '../constants/storesData';
import { skuData } from '../constants/skuData';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { themeBalham } from 'ag-grid-community';
import "./styles.css";
// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);



interface SKU {
  id: string;
  label: string;
  price: number;
  cost: number;
}

interface PlanningDataRow {
  store: string;
  storeId: string;
  sku: string;
  skuId: string;
  week: string;
  salesUnits: number;
  price: number;
  cost: number;
}

const Planning: React.FC = () => {
  // Store and SKU reference data


  const skus: SKU[] = skuData

  // Sample raw data from the table you provided
  const rawPlanningData = [
    { storeId: 'ST035', skuId: 'SK00158', week: 'W01', salesUnits: 58 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W07', salesUnits: 107 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W09', salesUnits: 0 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W11', salesUnits: 92 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W13', salesUnits: 122 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W15', salesUnits: 38 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W23', salesUnits: 88 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W31', salesUnits: 45 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W35', salesUnits: 197 },
    { storeId: 'ST035', skuId: 'SK00158', week: 'W50', salesUnits: 133 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W05', salesUnits: 178 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W06', salesUnits: 104 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W09', salesUnits: 32 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W18', salesUnits: 174 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W20', salesUnits: 124 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W27', salesUnits: 37 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W28', salesUnits: 95 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W29', salesUnits: 161 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W30', salesUnits: 85 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W32', salesUnits: 200 },
    { storeId: 'ST035', skuId: 'SK00269', week: 'W33', salesUnits: 120 },
    { storeId: 'ST035', skuId: 'SK00300', week: 'W14', salesUnits: 135 },
    // Additional data would be added here
  ];

  // Enhance the raw data with store and SKU information
  const enhancedPlanningData: PlanningDataRow[] = useMemo(() => {
    return rawPlanningData.map(row => {
      const store = storesData.find(s => s.id === row.storeId);
      const sku = skus.find(s => s.id === row.skuId);

      return {
        storeId: row.storeId,
        store: store ? store.label : row.storeId,
        skuId: row.skuId,
        sku: sku ? sku.label : row.skuId,
        week: row.week,
        salesUnits: row.salesUnits,
        price: sku ? sku.price : 0,
        cost: sku ? sku.cost : 0
      };
    });
  }, [rawPlanningData]);

  // Extract all unique weeks from the data
  const uniqueWeeks = useMemo(() => {
    const weeks = [...new Set(enhancedPlanningData.map(row => row.week))].sort();
    return weeks;
  }, [enhancedPlanningData]);

  // Column definitions for AG-Grid with proper typing
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'store',
      headerName: 'Store',
      filter: true
    },
    {
      field: 'sku',
      headerName: 'SKU',
      filter: true
    },
    {
      field: 'week',
      headerName: 'Week',
      filter: true
    },
    {
      field: 'salesUnits',
      headerName: 'Sales Units',
      editable: true,
      cellStyle: { textAlign: 'right' },
      valueParser: (params: any) => parseInt(params.newValue) || 0,
    },
    {
      headerName: 'Sales Dollars',
      valueGetter: (params: ValueGetterParams) => {
        return (params.data as PlanningDataRow).salesUnits * (params.data as PlanningDataRow).price;
      },
      cellStyle: { textAlign: 'right' },
      valueFormatter: (params: ValueFormatterParams) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: 'GM Dollars',
      valueGetter: (params: ValueGetterParams) => {
        const data = params.data as PlanningDataRow;
        return data.salesUnits * data.price - data.salesUnits * data.cost;
      },
      cellStyle: { textAlign: 'right' },
      valueFormatter: (params: ValueFormatterParams) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: 'GM %',
      valueGetter: (params: ValueGetterParams) => {
        const data = params.data as PlanningDataRow;
        const salesDollars = data.salesUnits * data.price;
        const gmDollars = salesDollars - data.salesUnits * data.cost;
        return salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
      },
      cellStyle: (params: CellClassParams) => {
        const gmPercentage = params.value as number;
        if (gmPercentage >= 40) {
          return { backgroundColor: 'green', color: 'white', textAlign: 'right' };
        } else if (gmPercentage >= 10) {
          return { backgroundColor: 'yellow', color: 'black', textAlign: 'right' }; // Added color: 'black'
        } else if (gmPercentage > 5) {
          return { backgroundColor: 'orange', color: 'black', textAlign: 'right' }; // Added color: 'black'
        } else {
          return { backgroundColor: 'red', color: 'white', textAlign: 'right' };
        }
      },
      valueFormatter: (params: ValueFormatterParams) => `${params.value.toFixed(2)}%`,
    },
  ], []);

  // Optional: If you want to keep the original grid with pivoted data
  // This transforms the flat data into a pivoted format with weeks as columns
  const pivotedPlanningData = useMemo(() => {
    const result: { [key: string]: any } = {};

    enhancedPlanningData.forEach(row => {
      const key = `${row.storeId}_${row.skuId}`;

      if (!result[key]) {
        result[key] = {
          store: row.store,
          storeId: row.storeId,
          sku: row.sku,
          skuId: row.skuId
        };
      }

      if (!result[key][row.week]) {
        result[key][row.week] = {};
      }

      result[key][row.week] = {
        salesUnits: row.salesUnits,
        price: row.price,
        cost: row.cost
      };
    });

    return Object.values(result);
  }, [enhancedPlanningData]);

  // Optional: Column definitions for the pivoted view with proper typing
  const pivotColumnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => [
    { field: 'store', headerName: 'Store' },
    { field: 'sku', headerName: 'SKU' },
    
    ...uniqueWeeks.map((week) => ({
      headerName: week,
      children: [
        {
          field: `${week}.salesUnits`,
          headerName: 'Sales Units',
          editable: true,
          cellStyle: {
            textAlign: 'right',
            paddingLeft: '5px', 
            borderRight: '1px solid #ccc'
          },
          valueParser: (params: any) => parseInt(params.newValue) || 0,
        },
        {
          headerName: 'Sales Dollars',
          valueGetter: (params: ValueGetterParams) => {
            const weekData = (params.data as any)[week];
            const salesUnits = weekData?.salesUnits || 0;
            const price = weekData?.price || 0;
            return salesUnits * price;
          },
          cellStyle: {
            textAlign: 'right',
            paddingLeft: '5px',
            borderRight: '1px solid #ccc'
          },
          valueFormatter: (params: ValueFormatterParams) => `$${params.value.toFixed(2)}`,
        },
        {
          headerName: 'GM Dollars',
          valueGetter: (params: ValueGetterParams) => {
            const weekData = (params.data as any)[week];
            console.log(weekData, 'weekData');

            const salesUnits = weekData?.salesUnits || 0;
            const price = weekData?.price || 0;
            const cost = weekData?.cost || 0;
            return salesUnits * price - salesUnits * cost;
          },
          cellStyle: {
            textAlign: 'right',
            paddingLeft: '5px',
            borderRight: '1px solid #ccc'
},
          valueFormatter: (params: ValueFormatterParams) => `$${params.value.toFixed(2)}`,
        },
        {
          headerName: 'GM %',
          valueGetter: (params: ValueGetterParams) => {
            // Access the week dynamically based on the column
            const week_ = params.colDef.headerName; // This will give you the week (e.g., "W01", "W07")
            const weekData = (params.data as any)[week]; // Access the nested week data

            if (!weekData) {
              console.log(`No data found for week: ${week_}`);
              return 0; // Return 0 if no data is found for the week
            }

            const salesUnits = weekData.salesUnits || 0;
            const price = weekData.price || 0;
            const cost = weekData.cost || 0;

            const salesDollars = salesUnits * price;
            const gmDollars = salesDollars - salesUnits * cost;
            const gmPercentage = salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;

            console.log(`Week: ${week}, GM Percentage: ${gmPercentage}`); // Debugging line
            if (isNaN(gmPercentage)) {
              console.error(`Invalid GM Percentage for week ${week}:`, gmPercentage);
              return 0;
            }
            console.log(gmPercentage, 'gmPercentage_9999');

            return gmPercentage;
          },
          cellStyle: (params: CellClassParams) => {
            console.log("cellStyle called with:", params.value);

            const gmPercentage = params.value as number;
     
            if (gmPercentage >= 40) {
              return {
                backgroundColor: 'green', color: 'white', textAlign: 'right',
                paddingLeft: '5px',
                borderRight: '1px solid #ccc' };
            } else if (gmPercentage >= 10) {
              return {
                backgroundColor: 'yellow', color: 'black', textAlign: 'right',
                paddingLeft: '5px',
                borderRight: '1px solid #ccc' };
            } else if (gmPercentage > 5) {
              return { backgroundColor: 'orange', color: 'black', textAlign: 'right',
            paddingLeft: '5px', 
            borderRight: '1px solid #ccc' };
            } else {
              return { backgroundColor: 'red', color: 'white', textAlign: 'right',
            paddingLeft: '5px', 
            borderRight: '1px solid #ccc' };
            }
          },
          valueFormatter: (params: ValueFormatterParams) => `${params.value.toFixed(2)}%`,
        }
      ],
    })),
  ], [uniqueWeeks]);

  // State to toggle between flat and pivoted view
  const [usePivotedView, setUsePivotedView] = useState(false);




  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Planning</h1>

      <div className="mb-4">
        <button
          onClick={() => setUsePivotedView(!usePivotedView)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Switch to {usePivotedView ? 'Flat' : 'Pivoted'} View
        </button>
      </div>

      <div className="" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          // theme={themeBalham}
          rowData={usePivotedView ? pivotedPlanningData : enhancedPlanningData}
          columnDefs={usePivotedView ? pivotColumnDefs : columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}

        />
      </div>
    </div>
  );
};

export default Planning;