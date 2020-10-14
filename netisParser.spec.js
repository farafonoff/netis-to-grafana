const fs = require('fs');
const NetisParser = require('./netisParser');
const PrometheusFormatter = require('./prometheusFormatter');
const prometheusTemplate = fs.readFileSync("./node_exporter_template.txt", "utf8");
console.log(prometheusTemplate);

describe('netisParser', () => {
  let sourceData;
  let subject = new NetisParser();
  let formatter = new PrometheusFormatter(prometheusTemplate);
  beforeEach(() => {
    sourceData = fs.readFileSync('./test/test_input.json', 'utf-8');
  });
  it('should parse data', () => {
    const data = subject.parseJsonString(sourceData);
  })
  it('should format parsed data', () => {
    const result = subject.extractNetworkData(subject.parseJsonString(sourceData));
  })
  it('shoud format to prometheus', () => {
    const data = subject.extractNetworkData(subject.parseJsonString(sourceData));
    console.log(formatter.formatStatistics(data));
  });
});