function highlight(table) {
  let cell;
  let row;
  
  for (let i = 0; i < table.rows.length; i++) {
    row = table.rows[i]
    cell = a => row.cells[a];
    
    cell(1).innerHTML < 18 ? row.setAttribute('style', 'text-decoration: line-through') : null;
    cell(2).innerHTML === 'm' ? row.classList.add('male') : row.classList.add('female');
    cell(3).dataset.available === 'true' ? row.classList.add('available') : ( row.classList.add('unavailable'), row.setAttribute('hidden', true) );
  }
}
