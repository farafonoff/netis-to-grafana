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
        "rx_bytes": iface.rx_bytes,
        "tx_bytes": iface.tx_bytes,
        "rx_pack": iface.rx_pack,
        "tx_pack": iface.tx_pack,
      })
    })
    return { network: result };
  }
}
