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
    console.log(result);
  })
  it('shoud format to prometheus', () => {
    const data = {
      network: [
        {
          iface_name: 'LAN',
          rx_bytes: '2834264',
          tx_bytes: '2474253',
          rx_pack: '7604037',
          tx_pack: '18932971'
        },
        {
          iface_name: 'WAN',
          rx_bytes: '351995',
          tx_bytes: '3430467',
          rx_pack: '986671804',
          tx_pack: '51819103'
        },
        {
          iface_name: 'WLAN2.4G',
          rx_bytes: '1531274',
          tx_bytes: '1821532',
          rx_pack: '35184272',
          tx_pack: '99353530'
        },
        {
          iface_name: 'WLAN5G',
          rx_bytes: '5028682',
          tx_bytes: '7586915',
          rx_pack: '223700340',
          tx_pack: '196471868'
        }
      ]
    };
    console.log(formatter.formatStatistics(data));
  });
});