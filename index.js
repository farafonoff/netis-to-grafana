const fs = require('fs')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000
const PrometheusFormatter = require('./prometheusFormatter');
const NetisParser = require('./netisParser');

const config = require('./config');
const prometheusTemplate = fs.readFileSync("./node_exporter_template.txt", "utf8");

const formatter = new PrometheusFormatter(prometheusTemplate);
const parser = new NetisParser();

function fetchFromNetis() {
  let headers = {
    "Authorization": 'Basic ' + Buffer.from(config.netis.username + ":" + config.netis.password).toString('base64')
  };
  return fetch(`http://${config.netis.address}/cgi-bin-igd/netcore_get.cgi`, {
    method: 'POST',
    headers: headers,
    body: 'mode_name=netcore_get&no=no'
  })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/metrics', (req, res) => {
  fetchFromNetis().then(result => result.text())
  .then(text => parser.parseJsonString(text))
  .then(json => parser.extractNetworkData(json))
  .then(netdata => formatter.formatStatistics(netdata))
  .then(formattedText => res.send(formattedText))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
