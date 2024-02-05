function verifyTokenController(req, res) {
    if (!req.user || !req.user.userID) {
        return res.status(400).json({ message: 'Error with user' });
    } else {
        return res.status(200).json({ userID: req.user.userID });;
    }
}

module.exports = verifyTokenController