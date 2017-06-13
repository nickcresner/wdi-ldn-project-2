const rp = require('request-promise');

function publicPointsProxy(req, res) {
  rp({
    url: `http://chargepoints.dft.gov.uk/api/retrieve/registry/format/json`,
    method: 'GET',
    json: true
  })
  .then((results) => {
    res.json(results);
  });
}

module.exports ={
  publicPointsProxy: publicPointsProxy
};
