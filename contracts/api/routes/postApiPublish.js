const User = require("../models/user")

module.exports = postApiPublish = {
    method: "post",
    path: "/api/publish",
    handler: async (req, res) => {
        try {
            console.log(req.body)
            const { video, user } = req.body
            const { walletaddress } = user
            const { videocid, thumbnailcid, title, description } = video

            const updatedUser = await User.findOneAndUpdate(
                { "user.walletaddress": walletaddress, "videos.videocid": videocid },
                {
                    $set: {
                        "videos.$.thumbnailcid": thumbnailcid,
                        "videos.$.title": title,
                        "videos.$.description": description,
                    },
                },
                { new: true }
            )
            res.status(200).json(updatedUser)
        } catch (err) {
            console.log("postApiPublish " + err.message)
            return res.status(400).send({
                error: "Server Error!",
                videos: [],
            })
        }
    },
}
