export const CustomTooltip = ({ active, payload, label }) => { 
  if (!active || !payload) return null;
  return (
    <div style={{
      backgroundColor: '#333',
      padding: '4px 8px',
      borderRadius: '5px',
      color: 'yellow',
      fontSize: 12,
      lineHeight: '1.2',
      whiteSpace: 'nowrap'
    }}>
      <div style={{ marginBottom: 2 }}>{label}</div>
      {payload.map(item => (
        <div key={item.dataKey}>
          <span style={{ color: item.color }}>{item.name}:</span> {item.value}
        </div>
      ))}
    </div>
  );
};
