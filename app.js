/* *****************************************************************************************
 * Author:  Jay Wheeler (gh@jwiv.com)
 * Date:    08/28/2019
 * Desc:    Express Server Entry point
 * *****************************************************************************************/

 //config vars
 const port = 4321;

// Express Module and App Server Declaration
const express = require('express');
const app = express();

// File System Modules
const path = require('path');
const fs = require('fs');

// Utility Modules
const formidable = require('formidable');

//Quick Routing for testing

app.get('/', function(req, resp) {
    resp.sendFile(path.join(__dirname + '/www/index.html')); //essentially static routing could also setup express static routes
});

app.post('/upload', (req, resp) => {
    const form = new formidable.IncomingForm();
    //console.log(form);
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = path.join(__dirname + '/downloads/' + files.filetoupload.name);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        resp.status(200).send(`<html><body><p>Your file named ${fields.txtName} was uploaded and moved!</p><br><br><a href="http://localhost:${port}/">Back to homepage</a></body></html>`);
      });
    });
});
 
/* *****************************************************************************************
 * Making the magic happen.  
 * Set listener for server on designated port 
 * ****************************************************************************************/
app.listen(port, () => {
  console.log(`Connect to webserver via http://localhost:${port}`);
})