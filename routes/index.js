var express = require('express');
var router  = express.Router();
var path    = require('path');
var ogs     = require('open-graph-scraper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});

// GET /calls/parse
router.get('/parse', function(req, res, next) {
  var url = req.query.url;
  console.log('url:', url);
  var options = {'url': url};
  if(url) {
    ogs(options, function (error, results) {
    if(error) {
      // render the error page
      res.status(error.status || 500);
      console.log('error:', error);
      res.sendFile(path.join(__dirname+"/views/error.html"));
    } else {
        res.locals.scrap = results.data;
        res.locals.scrapjson = JSON.stringify(res.locals.scrap)
        res.locals.scrapfrom = results.requestUrl
        // render the result page
        res.render('result', { title: 'Scrap result'});       
    }
    });
  } else {
    res.sendFile(path.join(__dirname+'/../views/index.html'));
  }
});


// POST /calls/parse
router.post('/parse', function(req, res, next) {
  var url = req.body.url;
  var options = {'url': url};
  if(url) {
    ogs(options, function (error, results) {
    if(error) {
      res.status(error.status || 500);
      res.send("An error occured, Please try again");
    } else {
        res.send(JSON.stringify({ results: results }));    
    }
    });
  } else {
    res.send("Please give a valid url.");
  }
});
module.exports = router;
