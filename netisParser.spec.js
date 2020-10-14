const fs = require('fs');
const NetisParser = require('./netisParser');
describe('netisParser', () => {
  let sourceData;
  let subject = new NetisParser();
  beforeEach(() => {
    sourceData = fs.readFileSync('./test/test_input.json', 'utf-8');
  });
  it('should parse data', () => {
    subject.parseJsonString(sourceData);
    
  })
});