var express = require('express');
var router = express.Router();
var userModel = require('../user');
var flashcardModel = require('../flashcard');
var io = require('../io');

/* GET home page. */
router.get('/', function(req, res, next) {
  //gyul fix this
  res.render('index', { title: 'Express' });
});

router.get('/displaycards', function(req, res){
    flashcardModel.find({user: req.user}, function(err, flashy){
      res.render('displaycards', flashy);
    });
});

router.get('/addingcardpage', function(req, res){
    res.render('/addcardpage');
});

app.get('/processimage', (req, res) =>{
  // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
  
    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "645f61b6b0114a4a8aeb6e96957ff181";
  
    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
  
    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };
  
    // Display the image.
    //var sourceImageUrl = document.getElementById("inputImage").value;
    var sourceImageUrl = "https://timedotcom.files.wordpress.com/2017/12/wendy-walsh-person-of-year-2017-time-magazine-2.jpg?quality=10";
    //document.querySelector("#sourceImage").src = sourceImageUrl;
  
   
  var data = { method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      body: '{"url": ' + '"' + sourceImageUrl + '"}'
    }
  //console.log(uriBase + "?" + querystring.stringify(params));
  fetch(uriBase + "?" + querystring.stringify(params), data)
  .then(function(res){
     // console.log(res);
      return res.json();
  })
  .then(function(res){
      console.log(res)
      var newFlash = new flashCardModel({
           word: res.description.tags[0],
        });
        newFlash.picture.data = fs.readFileSync("./images/maxresdefault.jpg");
        newFlash.picture.contentType = 'jpg';
        newFlash.save(function(err, products) {
        if (err) return console.error(err);
      //  console.log(products);
        });
  });
  res.redirect('/admin');
});

router.post('/deletecard/:page', function(req, res){
  flashCardModel.findOneAndRemove({"_id": req.params.card}, function(err, card){
  })
  res.redirect('/admin');
});
module.exports = router;
