function FormatController() {
  this.formatValues = (valuesData) => {
    const data = JSON.parse(valuesData);
    const formated = [];
    let date = '';
    Object.keys(data.values).forEach((key) => {
      date = new Date(1000 * key);
      formated.push([`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`, data.values[key]]);
    });
    data.values = formated;
    return JSON.stringify(data);
  };
}

module.exports = FormatController;