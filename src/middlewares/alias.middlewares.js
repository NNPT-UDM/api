class AliasMiddlewares {
  getUser(req, res, next) {
    const { id } = req.params;
    if (id) {
      req.query._id = id;
    }
    req.query.fields = "_id,profile,role,settings,activated,last_access";
    next();
  }

  updateMyCredential(req, res, next) {
    req.query.fields = "email,username";
    next();
  }

  updateUser(req, res, next) {
    req.query.fields = "display_name,username,email,phone,contacts,bio,gender,role,permissions_expanded,activated";
    // hash password if needed
    next();
  }

  getMe(req, res, next) {
    const user = req.user;
    // console.log("ME", user);
    if (!user) {
      return res.status(400).json({
        success: 0,
        message: "User not found",
      });
    }
    req.query._id = user.id;
    next();
  }

  updateMe(req, res, next) {
    req.query.fields = "profile,settings,last_access";
    next();
  }

  setOwner(req, res, next) {
    req.query.owner = req.query._id;
    delete req.query._id;
  }
  setAuthor(req, res, next) {
    req.query.author = req.query._id;
    delete req.query._id;
    next();
  }

  isAuthor(req, res, next) {
    req.body.author = req.query._id;
    next();
  }
}

module.exports.AliasMiddlewares = new AliasMiddlewares();
