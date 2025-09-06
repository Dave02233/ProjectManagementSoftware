import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
//Components
import { CustomTooltip } from './CustomTooltip';
//Styles
import styles from '../../Styles/Charts/SimpleChart.module.css'



export const SimpleChart = ({ intervento }) => {
  const data = intervento
  .map(item => ({
    Date: item.date,
    Lavoro: item.workingHours,
    Viaggio: item.travelHours
  }))
  .sort((a, b) => new Date(a.Date) - new Date(b.Date));


  const [xInterval, setXInterval] = useState(0)

  useEffect(() => {
    setXInterval(Math.floor(data.length / 10));
  }, [data]);

  return (
    <ResponsiveContainer  width="100%" height={400} className={styles.Container}>
      <ComposedChart
        className={styles.ComposedChart}
        data={data}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}
      >
        <CartesianGrid stroke="#cccccc3c" />
        <XAxis dataKey='Date' interval={xInterval} />
        <YAxis interval={0}/>
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
        <Legend />
        <Area type="monotone" dataKey="Lavoro" stroke="#4de87eff" fill="#4de87eff" fillOpacity={0.3} />
        <Line type="monotone" dataKey="Viaggio" stroke="#F8F7FD" activeDot={{ r: 5 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
