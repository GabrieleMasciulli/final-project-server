const secretKey = require('../utils/config').AUTH_SECRET_KEY
const User = require('../models/user')
const Role = require('../models/role')

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const signup = (req, res) => {
  const body = req.body

  const user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 8),
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map(role => role._id)
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'User was registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        user.roles = [role._id]
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'User was registered successfully!' })
        })
      })
    }
  })
}

const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      var token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: 86400, // 24 hours
      })

      var authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
      }
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      })
    })
}

module.exports = { signup, signin }
