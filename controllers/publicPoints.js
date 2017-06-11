const rp = require('request-promise');


function pointsProxy(req, res) {
  rp({
    url: `http://chargepoints.dft.gov.uk/api/retrieve/registry/format/json`,
    method: 'GET'
  })
  .then((results) => {
    res.json(results);
  });
}

module.exports ={
  proxy: pointsProxy
};
