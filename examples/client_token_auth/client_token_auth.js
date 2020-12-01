const mc = require('minecraft-protocol')

if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node echo.js <host> <port> [<name>] [<profiles folder>]')
  process.exit(1)
}

const client = mc.createClient({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : 'echo',
  profilesFolder: process.argv[5]
})

client.on('error', function (err) {
  console.log(err)
})
client.on('session', function (session) {
  console.info('session initialized ', JSON.stringify(session))
})
client.on('connected', function () {
  console.info('connected')
})
client.on('disconnect', function (packet) {
  console.log('disconnected: ' + packet.reason)
})
client.on('end', function () {
  console.log('Connection lost')
})
