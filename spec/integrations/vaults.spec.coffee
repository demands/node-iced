{expect} = require 'chai'
command = require './command'

describe 'list vaults', ->

  before ->
    @server.handler = (req, res) ->
      res.writeHead 200, 'Content-Type': 'application/json'
      res.end JSON.stringify
        Marker: 'test'
        VaultList: [ VaultName: 'Bird' ]

  it 'should honor the iced_host and iced_port environment variables', (done) ->
    out = command '--vaults', (err, stdout, stderr) ->
      expect(err).to.be.falsy
      expect(stderr).to.be.falsy
      expect(stdout).to.contain 'Bird'
      done()