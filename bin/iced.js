// Generated by CoffeeScript 1.6.3
var args, aws, glacier, knownOpts, nopt, pkg, rc, shortHands;

pkg = require('../package.json');

nopt = require('nopt');

aws = require('aws-sdk');

knownOpts = {
  version: Boolean,
  help: Boolean,
  vaults: Boolean
};

shortHands = {
  v: ['--version'],
  h: ['--help']
};

args = nopt(knownOpts, shortHands, process.argv);

rc = require('rc')(pkg.name, {
  endpoint: null,
  aws_access_key: null,
  aws_access_key_id: null,
  aws_region: null
});

aws.config.update({
  accessKeyId: rc.aws_access_key_id,
  secretAccessKey: rc.aws_access_key,
  region: rc.aws_region
});

if (args.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (args.help) {
  console.log(pkg.description);
  process.exit(0);
}

if (args.vaults) {
  glacier = new aws.Glacier({
    endpoint: rc.endpoint,
    apiVersion: '2012-06-01'
  });
  glacier.listVaults(function(err, data) {
    var vault, _i, _len, _ref;
    _ref = data.VaultList;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vault = _ref[_i];
      console.log(vault.VaultName);
    }
    return process.exit(0);
  });
}
