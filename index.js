const Express = require("express")
const app = Express()
const passport = require("passport")
const { BearerStrategy } = require("passport-azure-ad")

require("dotenv").config()

const config = {
    identityMetadata: process.env.identityMetadata,
    clientID: process.env.clientID,
    issuer: process.env.issuer,
    audience: process.env.audience,
    loggingLevel: process.env.loggingLevel,
    passReqToCallback: process.env.passReqToCallback
}

const bearerStrategy = new BearerStrategy(config, (token, done) => {
  done(null, {}, token)
})

app.use(passport.initialize())
passport.use(bearerStrategy)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  (req, res) => {
    console.log(req.user)
    console.log(req.authInfo)
   res.json(req.authInfo)
  }
)


app.listen(3000, () => {
  console.log("server started")
})
