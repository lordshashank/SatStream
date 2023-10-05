const { NFTStorage, Blob } = require("nft.storage")
require("dotenv").config()
const apiKey = process.env.NFT_STORAGE_TOKEN
const fs = require("fs")
const path = require("path")
const hlsFilePath = "./output"
async function uploadDirectory(directoryPath) {
    const files = await fs.promises.readdir(directoryPath)

    console.log(files)

    const blobs = await Promise.all(
        files.map(async (file, index) => {
            console.log(index)
            const filePath = path.join(directoryPath, file)
            const fileData = await fs.promises.readFile(filePath)
            const blob = new File([fileData], file, { type: "application/octet-stream" })
            return blob
        })
    )

    console.log(blobs)
    const client = new NFTStorage({ token: apiKey })
    let cid
    if (blobs) {
        cid = await client.storeDirectory(blobs)
    }
    console.log("Directory uploaded to IPFS with CID:", cid)

    return cid
}
const output = uploadDirectory(hlsFilePath)
console.log(output)
