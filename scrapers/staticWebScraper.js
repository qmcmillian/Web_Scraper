// Web Scraping a static site

const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html); // loads HTML of the entire page
    const statsTable = $(".statsTableContainer > tr"); // Jquery to get access of table element that hold all the stats
    const topPremierLeagueScorers = [];

    // use Jquery each method to extract all the necessary info needed for each row and push into Top Premier League Scorers Array
    statsTable.each(function () {
      const rank = $(this).find(".rank > strong").text();
      const playerName = $(this).find(".playerName > strong").text();
      const nationality = $(this).find(".playerCountry").text();
      const goals = $(this).find(".mainStat").text();

      topPremierLeagueScorers.push({
        rank,
        playerName,
        nationality,
        goals,
      });
    });
    console.log(topPremierLeagueScorers);
  })
  .catch(console.error);
