var express = require('express');
var router = express.Router();

var doctors = ['Beacon', 'House', 'Brown'];
var rooms = ['','',''];
// var docTaken = new Uint8Array(doctors.length);

/* GET users listing. */
router.get('/doc', function(req, res, next) {

  var docAssigned;
  do
  {
    if (doctors.length == 0)
    {
      docAssigned = 'no doctor available';
      break;
    }

    doctorId = getRandom();
  } while (doctorId > (doctors.length - 1));

  console.log('doctorId: ' + doctorId);

  if (typeof docAssigned === 'undefined')
  {
    docAssigned = doctors[doctorId];
    doctors.splice(doctorId, 1);
    rooms.splice(doctorId, 1);
  }

  res.json({ 'doctor':  docAssigned });
});

var numberInQueue = 0;
router.get('/enqueue', function(req, res, next) {
  console.log("add patient to a queue");
  numberInQueue ++;
  res.json({ 'queue': numberInQueue });

});

router.get('/dequeue', function(req, res, next) {

  if (numberInQueue > 0)
  {
    console.log("remove patient from the queue");
    numberInQueue --;
    res.json({ 'queue': numberInQueue });
  }
});

function getRandom()
{
  return parseInt(Math.random()*10)
}

module.exports = router;
