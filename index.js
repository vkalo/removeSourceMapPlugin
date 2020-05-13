const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');
const reg = /\.js\.map$/;

function removeSourceMap(basePath) {
  const folderlist = readdirSync(basePath);
  folderlist.forEach((p) => {
    const path = join(basePath, p);
    if (statSync(path).isDirectory()) {
      removeSourceMap(path);
    } else {
      reg.test(p) && unlinkSync(path);
    }
  });
}

function RemoveSourceMapPlugin() {}

RemoveSourceMapPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('start remove sourceMap');
    removeSourceMap(compiler.outputPath);
    console.log('finish remove sourceMap');
  });
};

module.exports = RemoveSourceMapPlugin;
