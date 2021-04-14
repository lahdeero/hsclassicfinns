import axios from "axios"
import express from "express"
const app = express()
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const rank_list = await fetch();
  // const rank_list = [{ accountid: "foo", rank: "10" }, { accountid: "bar", rank: "15" }]
  res.render('index', { rank_list: rank_list })
})

const fetch = async () => {
  const rank_list = []
  const players = ["Kufdon", "DHawk", "Merza", "Alpha", "Sopamaa", "Agathanos", 
  "Vardu", "Zumpp", "kane8D", "Roarr", "Snurmi", "Habugabu", "Troni", "Pietzu10", 
  "Makkis", "Harzz", "Tume", "Drafkunex", "monki3", "majis1", "Threat", "Cpra", 
  "Bezikki", "FR33V", "Sepelaaja", "Wampie", "m4k3z"].join("|").toLowerCase().split("|")
  const response = await axios.get("https://playhearthstone.com/en-gb/api/community/leaderboardsData?region=EU&leaderboardId=CLS")
  const rows = response.data.leaderboard.rows;
  rows.forEach((e) => {
    if (players.includes(e.accountid.toLowerCase())) {
      rank_list.push(e)
    }
  })
  return rank_list
}

app.set('view engine', 'pug')
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})