const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/results", (req, res) => {
  let query = req.query.search;

  request(
    "https://api.themoviedb.org/3/search/movie?api_key=0df950b8b0bc0c68da58182debfa8e07&query=" +
      query,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }

      let data = JSON.parse(body);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
  // res.render('movies');
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
