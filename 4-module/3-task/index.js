function highlight(table) {
  for (let row of table.rows) {
    
    row.cells[1].innerHTML < 18 
      ? row.setAttribute('style', 'text-decoration: line-through')
      : null;
      
    row.cells[2].innerHTML === 'm'
      ? row.classList.add('male')
      : row.classList.add('female');
      
    row.cells[3].dataset.available === 'true'
      ? row.classList.add('available')
      : ( row.classList.add('unavailable'), row.setAttribute('hidden', true) );
  }
}
