var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  mongoose = require('mongoose'),
  app = express();

//APP CONFIG
mongoose.connect('mongodb://localhost/blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//expressSanitizer must comes afetr bodyParser
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//MONGOOSE MODEL CONFIG

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test Blog',
//   image:
//     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFRcVFRUYFxcYFRcVFRUWFxcVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAD4QAAEDAQQGCAQFAwMFAAAAAAEAAhEDBBIhMUFRYXGRoQUTUoGxwdHwFCIyQgaCkuHxYqLCM7LSFiNTcnP/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKREAAgIBAwMDAwUAAAAAAAAAAAECERIDITETQVFSYZEEQmIUIoGh4f/aAAwDAQACEQMRAD8A09GW8DB0xoK9NY7rgCvIWWxnML0HRzC2CFxatXcWehpKWNSR1309UwiNHCVosj5CbXcAIGZ9lLSlPJJE6yji7ObdUhMIUur0TzaFwpCZdUhA6FwqhNuqXUBQq6pdTbqq6gKEkKXU66qLUxNCC1UWp11S6iyWjOWoS1aS1CWqrIaM5agLVpLUJanZk0ZixAWLUWISxOyHEyliEsWosQFiqzNwMpYhLFpe1LqNOhOzNwFBqsNSm03k7FpDCnYnp0LIVFaBTSLVQkZwlY46ZktFraMBiubWrStL7OFTrLhkp5OiKUNkc15JQtoOK7NisM4ldOnYhqVJ0ZyWR51vRpjJRetbRAGSiMyOkgbJZYXQFmGhCxiaF5X6VXdn0b+q9gqL7q1GsCMQsoRhquOiluyJ6zfYAhObRQ3UYJW0suxjHHuhRapdTLqu6qsmhd1S6m3FLqLChV1VdTrql1FhQm6qLU66oG6EWFCLql1OLYz4ICdKlaibob0pVYq6qLUTidSINWiZg0JLUJan3VRaqshozlqEtWgtVFqLJaMxahLVpLUN1VZDRnLEJYtBaqLEWTiZrisMT7qoNTsWIsNS6tMlarqu6iwxOYLHsT22ULZdV3UWOhDKACYGpgaiupWGIu6omQoiwxNHVoa1D5VpDEm0vjPJcc5NKz19OKbox2eWnNdFlQO0LNSpTktdOhrELmUrdnRKKqgGVYOAJKcGg5Zp1OmAFYatk5N5IweKWIi4rDE4hQNW9mNCw1QsTg1XdQAi4q6tagxVcSyHRkLFAxagxLexGVoKozVj3ygDU9zVUJRgkOeo3wKLUpzTuWkhCQtTnENadKstTYVEJksSWqi1NhVdTsmhN1UWpxaqLUWKhN1DdT7qG6nYqElqq6nXVV1FioXdV3UcK4RYUBdUupkKjgiwxBhXCU+0AIKdoJ0JJ2U9Nrk0QrQ39yiZNHSupFos5KacMk1g1ribb2Z6apbozWazkZraGqgiULTindlS1GyQhe6MSmIalMOwKrqJbIjG3uI+JG1aGhA2yBOZShNSlfASUexAEQaoWlE0q8iKKuq7qYGqFqoViXNSXhaXLDaCXOwUSlRcY2U5CiqvQtcSBKcdW3QpadKwSULpTUivWunKdeta2ZYlt2q1AQ4AhFCdk4i4VQjIQlFixBhVCsqpRYsSiFRCuVRKdixKIQoK1a7oKyutR0CUWGBre4DEpItbNax2mo4tgiFip0iTn6poTj7HoGuCjoIhY7LSjMlaHtQxJMr4ZupEaYGQVMJRh6Q3Yq/sUTbytOxYmDov8SMqlgbPzNJMxhBAg955LvOrACTgvjFH8SODBSusDYxN03i6PqMYHRiu7Zfx65t0FrDA/qBB3nyXBhNHo9SDPoVO0NcwVZuggHGJGzDbgpStGozK+c9J/jM1mXBDNYBlzjBnGMPfc+wfjGpTpkYPJktJcDGRjYInBS1MtShxZ9Lp1CdCc0rw/wCHvxmH/LVIBkwSd0DxXrWW1JZdwlFdjeCjasjbSE1toCtTZk4M0hXdSm1gmtdK1jKMtjJpoJRRRbkgPakPZGQT3FZ6tRcmrKNmummYLUIxlYzaYyWy1AFcutRWcZnXjaHNt2jAazsWS0Wh2g5nApT2JDmGcT6LpjNHPPSOxYQ5o+aIznYtba7TkQuHQrVBgHc8OCji44lyrIzwZ0KlvZJxjBNpVAQCCVzBrgd38LQLSYjzQ5CwAttqumAp8U4gwCDoyS3CTjd4Y8Voa4bE80LBlUX1I9UfWH7jdVGptSgBM+SM7H0zRVqQM1z6tqOOS1OeIyCS5jdSakS4GcX3ZJ9CxkQciiaGjQE0VVWT7E4LuOp0yMyju7Vm61TrRrU2x4o0Fu1EANazddtU60J7hSNUDWosvXBRFMNjzzvw2zMtaDsaD4hJ/wCmKfZH6Wr09wj7v7ZVmidfJcz2OvnseZd+F6eod7GkKh+GGf0R/wDNvivTimeyq6g6lFsukeeb+G6ekA9wHktNk6K6r/TfUZsviP0kEcl2hQjR4IjSbtCaQjLRqVRm+9vDR4ALYy0VNnBAKYmRPBRodOmNeAV4olyZqp2p2sLVSth1hcxz4OMx3o6dpadJG0+JnLvhLBc0K75Oy21HYqfaysdB7deGuZ8FVW0NmAXHR9LuZiErkGMQ6trdr8FgrW52vwUr1o0+vgsVZ7nAwM8sDh3QkoLwVxwStbH6+QWKraqna5BFVe7KJ06B3RnyCx1nRmQCcxhPOFrCEfBlqTklsyOtT+0f0hKNqf2nD8o9ENW0sAk5AYn6RzKV8Q3MZRog85K6VCPg4J60/UaG2l/adwb6KviKnbd+lnos99w0OM6rp4Yo21jgIcRjoHjKvCPgxetPjJjhaqnadwb6Kviavad+lvokOtMOk3t+EcB7zTjWnEA8sRCeC8EdWT+5kdaag+88Gx4K/iKnbPBvokh2uQc4djp1AxzUba2xi6dsR5808V4I6su8n8mnrqsfVyb6IRXq9o/2+mKzNt7DIvi8N44AgXhuVjpBoN0vaDrMNB3SSqxXgl6r9b+R5r1e0f7fRC60VdZ4N9EItYJgEHDRB75ByzQG0VCYukaZieQO5NRXgiWpL1P5CNavodH5QfBRlav2+DWoPiThnGUx5aEVS2Rs1EjyTr2RGb9b+WMNoqD7/wC1qnxb+04/lZywSRbTIzMZmHNGOwhLb0kdIGBznvwKMfYfVr7n8/6b22ip2juusV9fU7Tv0s9FgrWwduMMgW/sTmhbadJqPAnss/xceaMfYT1/yfydNtaprP6WqLm9eDj1zhueAOCtPH2J6/5P5PVtqgZzyT2VB7lR1jOh3EekLPUp1BkL27DiHFeW0mfURbNoeEQK5zetJ/03caeP9ya2pU003cWnwKnFeSsjogBXdCwisdLXfpcfAKzadYePyu9ElAHI3CmjwGa5NS3sbsO3AYaLxwnFC3pJx+loP5x5StFpNmb1InVddPZ3o6VIZzPDyXNFtfGLADpEyPCVqoVzmTGyAOZCT03QKaOnTpe8/NBUYAdAVU7SPcKqtpbojjJ5KMXQXuIqN1eKyVaOuZ3ptW1yDJu8v9wCzfG04PzDLE5mImflR05lqcVyZLTZxjJMasOcLMbMzV4rRUrXhOQ1mRI4LOXgAGWgaz6rWOnNGU9SD2M9SyU8TdA0zAmRtzSRQaDp5HxxWsVBoM6oiORVN3d8QFsm0c8oRZlFiMyGt3zj4InWcnB0Y5i68+a6LFZZ7lPqMzegjj1LDgBdbgdmjeFH0HASWtPCeJgBdU71ZZpVdQj9OjzVcwcGxrlxP+Lh4LO9labwLY0A3J4kAr0bqTTmBqRXB7C0Wojnl9JJu7PNNs9U4uewbCCd+OPJKDc2lzQScmkOkbRdXrBTGhKqUZwJMbJHgqWoZS+kPP02tb2CMjrxywGBOKJzaIEXWxjJhoHA58F1LR0Wx+bcRlnM71z7T0KCQYB2Xse4kYhUpJmE9GceEZHizYEEHLJ3leRhtF2AeWnUTq3zGSjug3aHEjUS+OEkclH9AaTB3SP2V2vJi4S9JKVBon/uSdV4SOJHgtdPo4OMuuvG3R3ZSsLujakYGR2XxyMLM6x1GnFjmaiyQPPyS/kdVzE67+jhGFNpB2yJ3HyQN6PP/iPc7/lCysFY5VjuOGWowtdK0Whv1BxB0hzTwvJ7+RPBveL/AKLPRh0M5nyEKI/ia/bI/K3yVIuQ8NHw/g+gEICxHeVXl4zPrUUKaIMV31XWqR7l3VVxX1h1cUDrQBp4KdyhdoDhEMvawCJ54LAajAfmDmE6CLvPI8Vv+InJpKZTB7IC0jPEmULMFCrTz0T22n/IrYyuP6T+ZvlK1MbrjgtFMJPV9icaMjX4fR/bPkEqu0DEgD8v7rqtbqcRszSat7YeI9VbkluQtziVntP37pu8sEnMRew1/L6+S6depGdPvkkcAPJYevY6YuEjQCJ8FcW3wDSXJkq3Rm4He71VQI+kHbnygp765GTD3QTySXVDpEb1opeTNxT4BMHRjsw5SEmtLc5OGQHmfVG62MH3tCy1mseZLtxme8RlvVrchqgqFpJ+wtwnGD/tlONaMyBqkxKyUGtEhrpGmGukiIHzaeKDq6TBdAc6TMZ+Juj3pTxRGTN9KrI1j3rVl+8ckphu/bA0fM4mP/UCFOvGLg0gD6jF0EowFmNBGueaudqXVrYANzMGc2wJkTEd2adBjDFKimwSBsQmmE67JyKCo3Z4IoDNVpDQSOKXcOghPqG5nACulDsQ4HcZhVbRDimZhKcxnv8AhMDe9Hd2IyZPSiAADoChaCntahc0DNGQdJCXWVrswjZZm6gDsRDYffBXj7lVkzPpIvqBqHBRQH3goixdNHTkqusjSiLEIYvOZ7KLFTUE1t7cowJoSGxZpa5KHqxqTpQOKpIiy2pgSQ5GHJ0Jsc1NYVlDk1jlLQzYwoKhQtche5TfYlR3E1isFemDmAd4Wyo5ZKhSw3NlLY5VXoukSTcgnOCR4FaLFZQB1eLmkEw4l0QMpOjNNeUt2IiSNowK3jl5MpqPgVXsLR9LB3DDwVMsx+4c5CE9ePpqNI/qbjxaR4J1jtVW9FRrQO004d4IkLo2ObfwZ6zQDGHd+yVTDRoBO3GFu6SsxJnGNMYZbQsgs4Gjz4koYJELm53xPFXTrU4MOJ1iDHdhj3KxROzh4JzG+8EJg4marUZnB3wQOJhHZ6g+qCCJEZYkac5wOhbA2Rn6oX05ECI0zkqsncy1LdDZ8oyJx5SgpW0kTLTqzy0YgeSW/o8h14EwMLo+mNV1CyzgAhoLRGi74fsqTRLTNnVSL0zriYB2fwga1ox15EEYrFX64CBBOiDszxy4rbSpnC8Z2EAjmkhvbgY1k5E98qBuOjuKa2zuaS5hBB+0iI3HyTHsnVe0wcfBFCsS1utWKWpNc2BEnvCATE4H3tUspFxrCok7SN3om02k61bqJ1FACfyqJvU7FECo0lVKihXIzvQQciDksK5SoGNlC5CHKiVaIZcqwUEq1RI0FMY5IBRhQykaA5C5yW1yjioooCo5ZqhTnlZ3lNDFuKWUTilk+8FpEiRUqwUBchLloZtB1LTVGRa4anYHiPRJdbSM6G+64H0VkoZTUiXEOn0jS+5jwdzjzEpnx1A4y7gfRIKkJ5E4M1tt9DXycVbLTQdk8DYTHisSgaEZIMH5N5pl2LC0jis5sj5klxOq6FnFMThgdmB5Jzazhk93j4ozQ8GJqUcZDcdowha2PBwLDGqJ5DyQfFVO0DvHomttQP1M72+hTUl5E4OuBFa21Gn5aZgHHHMbtC2U67XfNGWcjJXeY4ReGrH5Xfuio2YtMtMg5g6Ub8oP28Ma0tIkcildUMxjt0qn0mzheadGefgVQplpxE+Kdk4jabAD9R74TX05GBWd1W9hDgdhxVtYRmCRwd+6YmhV4eyon329o94VoEEqVIguQ7iQoVCVSAJKikqimIuVJVKpTEGCrDvYSryIH37zUsY+fe9LJn37lLe7d35d6k5k47s42nQEhlv96hv4JD/Z9EwnXB2aB670lzvLHTu2BAwHJTj37kRd72JZKpEso/z6Ie5EP49UJIPnu/lVZLRI9+apF77lQCdioqFIVhXCVjoFXHvcp6K0WFFAKFWoUmxpASrBVkKBqkssORNOrDdghhFCFJicUzRTruGmRqOK1B7Xabp1H6VzwjBVrUZD00zW8PGBYY1gyPVNDDEjEajJWSlVIyJHhwWtltOkA7sCtVNMxem0KNqaMxHLkotHxFM5jkoqsjH2EgopVKLlO0kqpVqIEVKqVFExAkqr6pRMAmmciVbnK1FLGCJOUa0JdOvRxPmoopvcqinu9j3tSnvGvcFFFSRLYhoz5oAQcdXvJRRMRYKo/udyiiYiH+FROHJRRIYUZBUoogCyrAxKiiAK0cFaiiALUhRRSUWAihRRAyw1EGqlECChECoomJkvKKKJgf/Z',
// body: "Hello! This is a blog post",
//     // created: ""
// });

//RESTFUL ROUTES

app.get('/', function (req, res) {
  res.redirect('/blogs');
});

//INDEX ROUTE
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log('ERROR');
    } else {
      res.render('index', { blog: blogs });
    }
  });
});

//NEW ROUTE

app.get('/blogs/new', function (req, res) {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function (req, res) {
  // create blog

  req.body.blog.body = req.sanitize(req.body.blog.body);
  
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) res.render('new');
    else {
      // redirect to index
      res.redirect('/blogs');
    }
  });
});

//SHOW ROUTE
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

//UPDATE ROUTE
app.put('/blogs/:id', function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) {
        res.redirect('/blogs');
      } else {
        res.redirect('/blogs/' + req.params.id);
      }
    }
  );
});

//DELETE ROUTE
app.delete('/blogs/:id', function (req, res) {
  // DESTROY AND THEN REDIRECT
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(400, function () {
  console.log('SEREVR IS RUNNING');
});
