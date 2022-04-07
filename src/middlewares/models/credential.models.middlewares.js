const bcrypt = require("bcryptjs");
const crypto = require("crypto");
module.exports.CredentialMiddleware = (schema) => {
  schema.virtual("account", {
    ref: "User",
    foreignField: "_id",
    localField: "_id",
    justOne: true,
  });

  schema.pre(/^findOne/, function (next) {
    this.populate({
      path: "account",
      populate: { path: "role", model: "Role" },
    });
    next();
  });
  schema.pre("save", function (next) {
    switch (true) {
      case [undefined, null, ""].includes(this.phone):
        this.phone = undefined;
        break;
      case [undefined, null, ""].includes(this.email):
        this.email = undefined;
        break;
      default:
        break;
    }
    next();
  });

  schema.pre(/^findOneAnd/, function (next) {
    const { phone, email } = this.getUpdate();
    switch (true) {
      case [undefined, null, ""].includes(phone):
        delete this.getUpdate().phone;
        break;
      case [undefined, null, ""].includes(email):
        delete this.getUpdate().email;
        break;
      default:
        break;
    }
    console.log(this.getUpdate());
    next();
  });
  schema.pre("save", async function (next) {
    try {
      // Only run this function if password was actually modified
      if (!this.isModified("password")) return next();

      // Generation a salt ...
      const salt = await bcrypt.genSalt(10);
      // Generation a password hash (salt + hash)
      const passWordHashed = await bcrypt.hash(this.password, salt);
      //Re-assign password hashed
      this.password = passWordHashed;

      // Delete passwordConfirm field
      this.password_confirm = undefined;

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.pre("save", function (next) {
    // Only run this function if password was moddified (not on other update functions)
    if (!this.isModified("password") || this.isNew) return next();

    this.password_change_at = Date.now() - 1000;
    next();
  });

  schema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  schema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.password_change_at) {
      const changedTimestamp = parseInt(this.password_change_at.getTime() / 1000, 10);

      return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
  };

  schema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.password_reset_token = crypto.createHash("sha256").update(resetToken).digest("hex");

    console.log({ resetToken }, this.password_reset_token);

    this.password_reset_expires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  };
};
