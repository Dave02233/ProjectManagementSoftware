import React, { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { CustomTooltip } from './CustomTooltip';
import { StatusBox } from '../SingleItems/StatusBox.jsx';
// Styles
import styles from '../../Styles/Charts/MainChart.module.css';
// Store
import { getStats } from '../../Store/Slices/interventiSlice.js';



export const MainChart = () => {

  const dispatch = useDispatch();
  const requestsStats = useSelector(store => store.interventi.requests.stats);
  const stats = useSelector(store => store.interventi.stats);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  const sortedData = useMemo(() => {
    if (!stats) return [];
    return [...stats].sort((a, b) => {
      const [yearA, weekA] = a.week.split('-W').map(Number);
      const [yearB, weekB] = b.week.split('-W').map(Number);
      return yearA !== yearB ? yearA - yearB : weekA - weekB;
    });
  }, [stats]);

  return (
    <div className={styles.ChartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="0" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#10101048' }} />
          <Legend />
          <Bar dataKey="completed" fill="#82ca9d" />
          <Bar dataKey="pending" fill="#d75d5dff" />
          <Bar dataKey="active" fill="#dfa126ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
