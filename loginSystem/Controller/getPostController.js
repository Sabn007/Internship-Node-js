

exports.home = (req, res) => {
    res.render("index", { title: "Home" });
  }

exports.login =  (req, res) => {
    const response = {
      title: "Login",
      error: req.query.error,
    };
    res.render("login", response);
  }

  exports.logout =  (req, res) => {
    req.logout();
    res.redirect("/");
  }