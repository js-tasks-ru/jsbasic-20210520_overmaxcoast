export default class UserTable {
  
  constructor(rows) {
    this._rows = rows;
    this.elem = document.createElement('table');
    this.elem.innerHTML = this._tableHead() + this._tableBody();
    this.elem.addEventListener('click', this._clickEvent);
  }
  
  _tableHead() {
    const thRawData = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    const thInfo = thRawData
      .map(v => `<th>${v}</th>`)
      .join('');
    return '<thead><tr>' + thInfo + '</tr></thead>';
  }
  
  _tableBody() {
    const tdList = this
      ._rows
      .map(item => this._tableBodyRows(item))
      .join('');
    return '<tbody>' + tdList + '</tbody>';
  }
  
  _tableBodyRows(item) {
    const tdButton = `<td><button data-action='remove'>X</button></td>`;
    const tdInfo = Object
      .values(item)
      .map(v => `<td>${v}</td>`)
      .join('');
    return '<tr>' + tdInfo + tdButton + '</tr>';
  }
  
  _clickEvent(event) {
    if (event.target.dataset.action === 'remove')
      event
        .target
        .closest('tr')
        .remove();
  }
  
}
