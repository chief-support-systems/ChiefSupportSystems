const replaceInFiles = require('replace-in-files');
const fs = require('fs');

const { version } = require('./package.json');

const replaceAll = async (type, host, remoteUrl) => {
  const filename = 'api-spec-' + type + '.yml';

  await new Promise((res, rej) => {
    fs.copyFile('api-spec-template.yml', filename, (err) => {
      if (err) {
        console.error(err);
        rej(err);
      }

      res();
    });
  });

  await replaceInFiles({
    files: filename,
    from: /TEMPLATEURL/g,
    to: remoteUrl,
    saveOldFile: false,
    returnCountOfMatchesByPaths: true,
  });

  await replaceInFiles({
    files: filename,
    from: /TEMPLATEHOST/g,
    to: host,
    saveOldFile: false,
    returnCountOfMatchesByPaths: true,
  });

  await replaceInFiles({
    files: filename,
    from: /APIVERSION/g,
    to: version,
    saveOldFile: false,
    returnCountOfMatchesByPaths: true,
  });
};

Promise.all([replaceAll('production', 'api', 'k2mfaanpza')])
  .then((r) => {
    console.log('Done');
  })
  .catch((err) => {
    console.error(err);
  });
