const WHITELIST_DOMAINS = ["http://localhost:5173"]

export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}