const Stadium = require('../models/stadium')

exports.show = async (req, res) => {
    var perPage = 3;
 
    // total number of records from database
    var total = await Stadium.count();
 
    // Calculating number of pagination links required
    var pages = Math.ceil(total / perPage);
 
    // get current page number
    var pageNumber = req.params.page || 0;
 
    // get records to skip
    var startFrom = pageNumber * perPage;
 
    // get data from mongo DB using pagination
    var stadiums = await Stadium.find()
        .skip(startFrom)
        .limit(perPage);
 
    // render an HTML page with number of pages, and users data

   // const stadiums  = await Stadium.find()
    res.render('all-stadiums', {stadiums: stadiums, pages:pages})
}