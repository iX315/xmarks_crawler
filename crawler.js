const cheerio = require("cheerio")
const request = require("request-promise")

const log = console.log

class xMarks {
    constructor(url) {
        this.url = url
    }
    start() {
        var options = {
            uri: this.url,
            transform: (body) => {
                return cheerio.load(body)
            }
        }
        return request(options).then(($) => {
            var out = []
            $("div.foldername, a.bookmark.link, p.bookmark.description").each((i, e) => {
                var _class = $(e).attr("class")
                if (_class === "foldername") {
                    var _folderName = e.children[e.children.length - 1].data.trim()
                    out.push({
                        name: _folderName,
                        links: []
                    })
                    return
                }
                var _last = out[out.length-1].links
                if (_class === "bookmark link") {
                    var _link = $(e).attr("href")
                    var _name = e.children[e.children.length - 1].data.trim()
                    _last.push({
                        name: _name,
                        link: _link
                    })
                    return
                }
                if (_class === "bookmark description") {
                    var _description = e.children[e.children.length - 1].data.trim()
                    _last[_last.length-1]["description"] = _description
                    return
                }
            })
            return out
        })
    }
}


module.exports = xMarks