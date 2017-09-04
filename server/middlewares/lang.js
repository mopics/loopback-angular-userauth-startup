var negotiator = require('negotiator');
var SG = require('strong-globalize');

module.exports = function(options) {
  var allowedLangs = ['nl','en'];
  return function localeHandler(req, res, next) {
    var lang = new negotiator(req).language(allowedLangs);
    var g = SG();
    g.setLanguage(lang);    
    next();
  };
};