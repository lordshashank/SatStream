const User = require("../models/user")

module.exports = getAllVideosRoutes = {
    method: "get",
    path: "/allvideo",
    handler: async (req, res) => {
        try {
            console.log("getAllVideosRoutes")
            const usersvideos = await User.find({}).select("videos")
            const allVideos = usersvideos.reduce((videosArray, user) => {
                return videosArray.concat(user.videos)
            }, [])
            res.status(200).json(allVideos)
        } catch (err) {
            console.log("allVideos " + err.message)
            return res.status(400).send({
                error: "Server Error!",
                videos: [],
            })
        }
    },
}
// const User = require("../models/user")

// module.exports = getAllVideosRoutes = {
//     method: "get",
//     path: "/allvideos",
//     handler: async (req, res) => {
//         try {
//             const page = req.query.page || 1
//             const pageSize = 10

//             const usersVideos = await User.find({}).select("videos")

//             const startIndex = (page - 1) * pageSize
//             const endIndex = startIndex + pageSize

//             const videosForPage = usersVideos
//                 .reduce((videosArray, user) => {
//                     return videosArray.concat(user.videos)
//                 }, [])
//                 .slice(startIndex, endIndex)

//             res.status(200).json({
//                 videos: videosForPage,
//                 currentPage: page,
//                 totalPages: Math.ceil(usersVideos.length / pageSize),
//             })
//         } catch (err) {
//             console.error("getAllVideosRoutes: " + err.message)
//             return res.status(500).send({
//                 error: "Server Error!",
//                 videos: [],
//             })
//         }
//     },
// }
