
exports.allAccess = (req, res) => {
    return res.status(200).send({
        message: "Public Content"
    })

}
exports.userBoard= (req, res) => {
    return res.status(200).send({
        message: "User Content"
    })
}

exports.adminBoard= (req, res) => {
    return res.status(200).send({
        message: "Admin Content"
    })
}
exports.userModerator= (req, res) => {
    return res.status(200).send({
        message: "Moderator Content"
    })
}