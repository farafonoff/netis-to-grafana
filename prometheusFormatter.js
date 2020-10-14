const Mustache = require('mustache');

module.exports = class PrometheusFormatter {
    constructor(template) {
        this.template = template;
        Mustache.parse(template);
    }
    formatStatistics(statistics) {
        return Mustache.render(this.template, statistics);
    }
}