const User = require("../models/user")

module.exports = getUserVideosRoutes = {
    method: "get",
    path: "/api/uservideo/:walletaddress",
    handler: async (req, res) => {
        const { walletaddress } = req.params
        try {
            const userVideos = await User.findOne({ "user.walletaddress": walletaddress })
            if (userVideos == null) res.status(404).json([])
            else res.status(200).json(userVideos.videos)
        } catch (err) {
            console.log("getUserVideos " + err.message)
            return res.status(400).send({
                error: "Server Error!",
                videos: [],
            })
        }
    },
}
