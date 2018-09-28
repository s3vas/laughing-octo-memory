

module.exports = function (req, res, next) {
	//req.user is set because this function runs after authorization.
	//401-Unauthorized jwt is wrong
	//403-Forbidden jwt is right but user has not the right to access 

	if (!req.user.isAdmin)
		return res.status(403)
	next();
}