class PermissionsConstants {
  permission(range, codes) {
    const query = codes.map((code) => {
      let q = "";
      switch (code) {
        case 0:
          // test
          break;
        case 5:
          break;
        case 6:
          // read me
          break;
        case 7:
          // read user
          break;
        case 8:
          // read detail role
          break;
        case 9:
          // read list roles
          q = this.readRoles(range);
          break;
        case 10:
          // change password
          break;
        case 11:
          //  add classwork
          break;
        case 12:
          //  edit classwork mark
          break;
        case 13:
          //  add classwork answer
          break;
        case 14:
          //  edit your own answer
          break;
        case 15:
          // show student classworks
          break;

        default:
          break;
      }
      return q;
    });
    return query;
  }
  // read
  readRoles(range) {
    // in visible can read
    let query = range.map((role, index) => {
      return `or[${index}][slug]=${role}`;
    });
    return query.join("&");
  }
  // update
  // create
  // delete
}

module.exports.PermissionsConstants = new PermissionsConstants();
