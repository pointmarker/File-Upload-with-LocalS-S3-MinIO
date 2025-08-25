const path = require('path')
exports.serveHTML = (page) => {
    console.log('serveStatice geldi, oynayacak sayfa ',page)
    return (req,res) => {
        res.status(200).sendFile(path.join("C:","Users","90533","Desktop","node","File-Upload-with-MinIo", "app","public","pages",`${page}.html`))
    } 
}