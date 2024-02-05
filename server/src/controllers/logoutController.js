function logoutController(req, res) {
    res.cookie('token', '', {
        httpOnly: true,
        maxAge: 0,
        sameSite: 'strict',
        secure: true
    });
    res.status(200).json({message:'Logout succesful'});
}

module.exports = logoutController;