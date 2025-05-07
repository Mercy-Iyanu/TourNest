export const downloadCSV = (data) => {
    const headers = ['Title', 'Base Price', 'Adjustment Type', '% Adjustment', 'Final Price'];
    const rows = data.map(t => [
      t.title,
      `$${t.basePrice}`,
      t.adjustmentType || '—',
      t.percentage || '0%',
      `$${t.adjustedPrice}`
    ]);
  
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Tour_Price_Sheet.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  