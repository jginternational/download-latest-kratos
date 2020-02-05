const fs = require('fs');
const http = require('https');
const extract = require('extract-zip')
const shared_url = "https://www.dropbox.com/sh/05bcads1ghy8m5p/AAB0NFJqkHxJbaUvqMQQpEi_a?dl=1";
const tmp_zip = "file.zip";

function DownloadFile() {
    // Get the URL
    _getDefinitiveUrl(shared_url, function (url) {
        // Prepare the file
        const file = fs.createWriteStream(tmp_zip);

        // Get the file
        http.get(url, function (response) {
            // Write the stream into the file
            response.pipe(file).on('finish', () => {
                console.log('All writes are now complete.');
            });

            // unzip
            //_unzip(tmp_zip);
            console.log("b");
        });
        console.log("a");
    })
}

function _unzip(filename) {
    let cur = process.cwd();
    

    extract(filename, { dir: "E:\PROYECTOS\KratosMore\DownloaderAction\download-latest-kratos\PROYECTOSKratosMoreDownloaderActiondownload-latest-kratos\file\ " }, function (err) {
        console.error(err);
    })
}


// Dropbox redirects browsers, so ask for the final zip link
function _getDefinitiveUrl(source_url, callback) {
    const request = http.get(source_url, function (response) {
        if (response.statusCode === 301) {
            let next_url = "https://www.dropbox.com" + response.headers.location;
            _getDefinitiveUrl(next_url, function (inner_url) { callback(inner_url) })

        } else if (response.statusCode === 302) {
            url = response.headers.location;
            callback(url);
        }
    });
}

_unzip(tmp_zip);

//DownloadFile();
