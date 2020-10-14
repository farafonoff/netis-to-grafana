const { parse } = require('mustache');

module.exports = class NetisParser {
  parseJsonString(string) {
    return JSON.parse(string);
  }

  extractNetworkData(parsedData) {
    const statistics = parsedData.statistics_list;
    const result = [];
    statistics.forEach(iface => {
      result.push({
        "iface_name": iface.type,
        "rx_bytes": iface.rx_bytes * 1024,
        "tx_bytes": iface.tx_bytes * 1024,
        "rx_pack": iface.rx_pack,
        "tx_pack": iface.tx_pack,
      })
    })
    return { 
      network: result, 
      cpu: Number(parsedData.cpu.split("%")[0])/100 
    };
  }
}
