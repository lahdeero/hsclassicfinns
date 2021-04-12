import axios from "axios"
import express from "express"
const app = express()
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const rank_list = await fetch();
  let html = `<html><head><title>suomi toplista</title></head><body><h1>suomi toplista</h1><table><thead>
  <tr><td>nick</td><td>rank</td></tr></thead>`
  rank_list.forEach((e) => {
    html += `<tr><td>${e.accountid}</td><td>${e.rank}</td></tr>`
  })
  html += "</table></body></html>"
  res.send(html)
})

const printTopList = (rank_list) => {
  rank_list.forEach((e) => {
    console.log(e)
  })
}

const fetch = async () => {
  const rank_list = []
  const players = ["Kufdon", "DHawk", "Merza", "Alpha", "Sopamaa", "Agathanos", 
  "Vardu", "Zumpp", "kane8D", "Roarr", "Snurmi", 
  "Habugabu", "Troni", "Pietzu10", "Makkis", "Harzz", 
  "Tume", "Drafkunex", "monki3", "majis1", "Threat"].join("|").toLowerCase().split("|")
  const response = await axios.get("https://playhearthstone.com/en-gb/api/community/leaderboardsData?region=EU&leaderboardId=CLS")
  const rows = response.data.leaderboard.rows;
  rows.forEach((e) => {
    if (players.includes(e.accountid.toLowerCase())) {
      rank_list.push(e)
    }
  })
  return rank_list
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})