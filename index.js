var path = require('path');
var process = require('process');
var resolve = require('resolve');

const cwd = process.cwd();
var pkg = require(cwd + '/package.json');
let cache = {};

module.exports = function (file, data) {
    if (file.indexOf('metal-') === 0) {
        const cachedFileData = cache[file];

        if (!cachedFileData) {
            data.basedir = cwd;
            cache[file] = data;
        }

        data = cache[file];
    }

    const modulePkg = pkg.localDependencies && pkg.localDependencies[file.substring(0, file.indexOf('/'))];
    
    if (modulePkg) {        
        data.basedir = path.resolve(process.cwd(), modulePkg);
        data.moduleDirectory = 'src/main/resources/META-INF/resources';
        file = file.substring(file.indexOf('/') + 1);
    }

    return resolve.sync(file, data);
};