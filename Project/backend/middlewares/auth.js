const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
	let accessToken = req.headers.authorization;

	if (!accessToken) {
		return res.status(403).json({
			error: "Unauthorized",
		});
	}

	let payload;
	try {
		payload = jwt.verify(accessToken, process.env.JWT_SECRET);
		req._id = payload._id;

		next();
	} catch (e) {
		// return req unauthorized error
		return res.status(403).json({
			error: "Unauthorize",
		});
	}
};

exports.isAdmin = (req, res, next) => {
	if (req.query && req.query.user_id) {
		let user_id = req.query.user_id;
		User.findById(user_id, function(err, user) {
			if(user.isAdmin){
				next();
			} 
			else {
				res.status(403).send('Unauthorized access');
			}
		});
	} else {
		res.status(403).send('Error, missing User Id');
	}
}