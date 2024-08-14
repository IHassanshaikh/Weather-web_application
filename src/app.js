const express = require("express");
const app = express();
const hbs = require('hbs');
const path = require("path");
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname, "../public")
const templatespath = path.join(__dirname, "../templates/views")
const partialspath = path.join(__dirname, "../templates/partials")

app.use(express.static(publicpath))

app.set('view engine', 'hbs');
app.set('views', templatespath);
hbs.registerPartials(partialspath)

app.get("/", (req, res) => {
    res.render("index.hbs");
})
app.get("/about", (req, res) => {
    res.render("about.hbs");
})
app.get("/weather", (req, res) => {
    res.render("weather.hbs");
})
app.get("*", (req, res) => {
    res.render('404page.hbs', {
        errormsg: 'Opps! Page Not Found'
    });
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})