$(document).on("submit", "#userProfileFormFill", function (event) {
  event.preventDefault();
  var formData = $(this).serializeFormJSON();
  var request = new XMLHttpRequest();
  request.open($(this).attr("method"), $(this).attr("action"));
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      toastr.clear();
      toastr.success("Success");
      $("#userProfileFormFillModal").modal("hide");
    } else {
      // console.log(request.response);
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});
