const path = require('path');
const fs = require('fs');
const fs_extra = require('fs-extra');
const urlparser = require('urlparse');

const cwd = process.cwd();
const mockDir_ajax = path.join(cwd, 'mock', 'ajax');
fs_extra.ensureDirSync(mockDir_ajax);

module.exports = async function (req, res, next) {
    let filePath = req.path || '',
        mockPath,
        context;

    if (ifStaticFile(filePath)) {
        return res.json({ message: 'not support' });
    }

    filePath = filePath.replace(/(\/?)$/, '');
    mockPath = path.join(mockDir_ajax, filePath + '.tpl.js');
    console.log(mockPath);
    fs_extra.ensureFileSync(mockPath);
    context = fs.readFileSync(mockPath, 'utf8');

    if (context === '') {
        fs.writeFileSync(mockPath, 'module.exports = {};', 'utf8');
    }

    delete require.cache[require.resolve(mockPath)];
    context = require(mockPath);

    if (typeof context === 'function') {
        context = context.call(null, urlparser(url));
    }

    return res.json(context);
}

/**
 * 是否为静态文件
 * @param {*} type 
 */
function ifStaticFile(type) {
    let imgRex = /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        fontRex = /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        scriptRex = /\.(js|css|json)(\?.*)?$/;

    return imgRex.test(type) || fontRex.test(type) || scriptRex.test(type);
}
