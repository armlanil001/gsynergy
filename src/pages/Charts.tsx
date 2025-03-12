import React, { useState } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import { chartData } from '../constants/chartData';

// Updated data structure with static values for each store
const storeData= chartData;

const StoreChart: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<string>('San Francisco Bay Trends');

  const data = storeData[selectedStore];

  return (
    <div className="p-4 max-w-10xl mx-auto" style={{ height: '70vh' }}>
      <h2 className="text-xl font-bold mb-4">Store Performance Chart</h2>
      <div className="mb-4">
        <label htmlFor="store-select" className="font-semibold">Select Store: </label>
        <select
          id="store-select"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="ml-2 border rounded p-1"
        >
          {Object.keys(storeData).map((store) => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="70%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
          <YAxis yAxisId="right" orientation="right" stroke="#ff5733" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollars" fill="#82ca9d" name="GM Dollars" />
          {/* Zigzag line with step type */}
          <Line className='p-10' yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff5733" strokeWidth={4} name="GM %" dot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StoreChart;
