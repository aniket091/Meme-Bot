const { readdirSync } = require('fs');
const ascii = require('ascii-table');

const table = new ascii('Events')
table.setHeading('Event', 'Load status');

module.exports = (client) => {

  const events = readdirSync('./events').filter(file => file.endsWith('.js'));

  for (let file of events) {
    let pull = require(`../events/${file}`)

    pull.event = pull.event || file.replace('.js', '')
    
    table.addRow(file, '✅');
  }

  // Log the table
  console.log(table.toString());
}