const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
app.get('/', (req, res) => res.send('Bot is running!'))
app.listen(3000, () => console.log('Web server alive'))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'sklsmplol.aternos.me',
    port: 22717,
    username: 'fandomboi',
    auth: 'offline',
    version: '1.21.4'
  })

  bot.on('spawn', () => {
    console.log('fandomboi joined the server!')
  })

  // Anti-AFK
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }, 30000)

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
    setTimeout(createBot, 5000)
  })

  bot.on('end', () => {
    console.log('Disconnected, reconnecting...')
    setTimeout(createBot, 5000)
  })
}

createBot()
