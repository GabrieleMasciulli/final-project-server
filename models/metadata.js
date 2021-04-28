require('dotenv').config()
const mongoose = require('mongoose')

const metadataSchema = new mongoose.Schema({
  coingecko_id: {
    type: 'String',
  },
  symbol: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
  hashing_algorithm: {
    type: 'String',
  },
  categories: {
    type: ['String'],
  },
  description: {
    en: {
      type: 'String',
    },
  },
  links: {
    homepage: {
      type: ['String'],
    },
    blockchain_site: {
      type: ['String'],
    },
    official_forum_url: {
      type: ['String'],
    },
    chat_url: {
      type: ['String'],
    },
    announcement_url: {
      type: ['String'],
    },
    twitter_screen_name: {
      type: 'String',
    },
    facebook_username: {
      type: 'String',
    },
    telegram_channel_identifier: {
      type: 'String',
    },
    subreddit_url: {
      type: 'String',
    },
    repos_url: {
      github: {
        type: ['String'],
      },
    },
  },
  image: {
    thumb: {
      type: 'String',
    },
    small: {
      type: 'String',
    },
    large: {
      type: 'String',
    },
  },
})

metadataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Metadata', metadataSchema)
