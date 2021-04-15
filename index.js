import axios from "axios"
import express from "express"
const app = express()
const port = process.env.PORT || 3000;

const players = ["Kufdon", "DHawk", "Merza", "Alpha", "Sopamaa", "Agathanos", 
"Vardu", "Zumpp", "kane8D", "Roarr", "Snurmi", "Habugabu", "Troni", "Pietzu10", 
"Makkis", "Harzz", "Tume", "Drafkunex", "monki3", "majis1", "Threat", "Cpra", 
"Bezikki", "FR33V", "Sepelaaja", "Wampie", "m4k3z", "Iksu"].join("|").toLowerCase().split("|")

app.get('/', async (_req, res) => {
  const rank_list = await fetch();
  // const rank_list = [{ accountid: "foo", rank: "10" }, { accountid: "bar", rank: "15" },
  // { accountid: "kolmas", rank: "17" }, { accountid: "joku", rank: "77" }, { accountid: "qwerty", rank: "77" }]
  res.render("index", { rank_list: rank_list })
})

app.get("/players", (_req, res) => {
  res.render("players", { players: players })
})

const fetch = async () => {
  const response = await axios.get("https://playhearthstone.com/en-gb/api/community/leaderboardsData?region=EU&leaderboardId=CLS")
  const rows = response.data.leaderboard.rows;
  return rows.filter((e) => players.includes(e.accountid.toLowerCase()))
}

app.set('view engine', 'pug')
app.use('/favicon.ico', express.static('assets/favicon.png'));
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})