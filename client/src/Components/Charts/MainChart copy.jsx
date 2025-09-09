import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
//Components
import { CustomTooltip } from './CustomTooltip';
//Styles
import styles from '../../Styles/Charts/MainChart.module.css'
//Store
import { getStats } from '../../Store/Slices/interventiSlice.js'


export const MainChart = () => {

  const dispatch = useDispatch();
  
  const data = useSelector(store => {
    return ([store.interventi.requests.stats, store.interventi.stats])
  })

  useEffect( _ => {
    dispatch(getStats())
  }, [])



  const sortedData = useMemo(() => {
    return data[1] ? [...data[1]].sort((a, b) => {
      const [yearA, weekA] = a.week.split('-W').map(Number);
      const [yearB, weekB] = b.week.split('-W').map(Number);

      return yearA !== yearB ? yearA - yearB : weekA - weekB;
    }) : [];
  }, [data[1]]);


  return (
    <div className={styles.ChartContainer}>
      <ResponsiveContainer width="100%" height='100%'>
        <BarChart
          width={500}
          height={300}
          data={sortedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >

          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#10101069'}}/>
          <Legend />
          <Bar dataKey="completed" fill="#82ca9d"  />
          <Bar dataKey="pending" fill="#d75d5dff" />
          <Bar dataKey="active" fill="#dfa126ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

