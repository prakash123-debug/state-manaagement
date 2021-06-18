const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination : function(req,file,cb){
		const imagepath = 'uploads/images'
      fs.mkdirSync(imagepath, { recursive: true })
      cb(null, imagepath);
	},
	filename : function(req,file,cb){
		cb(null,Date.now()+"--"+file.originalname);
	},

});


const fileFilter = (req, file, cb) => {
  
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("You can upload only image files!!"));
    } else {
      cb(null, true);
    }
};
const upload = multer({
	storage:storage,
	fileFilter:fileFilter
});

module.exports = {
	upload:upload
}