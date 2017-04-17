const crawler = require("./crawler.js")
const log = console.log

new crawler("http://share.xmarks.com/folder/bookmarks/mQ7N0WjoHA").start().then((res)=>{
    log(res)
    process.exit(0)
})