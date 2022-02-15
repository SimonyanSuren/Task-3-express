module.exports = (req, res, next) => {
	if(req.get('sessionToken')) {
		console.log('seesion token found!', req.get('sessionToken'));
		next();
	} else {
		next(new Error('no token found'))
	}
}