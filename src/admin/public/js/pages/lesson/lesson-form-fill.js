$(document).on("submit", "#lessonFormFill", function (event) {
  event.preventDefault();

  var formData = $(this).serializeFormJSON();
  var request = new XMLHttpRequest();
  request.open($(this).attr("method"), $(this).attr("action"));
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      $("#lessonFormFillModal").modal("hide");
      $("#lessonFormFill").trigger("Submitted");
      toastr.clear();
      toastr.success("Success");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});
$("#lessonFormFillModal").on("hidden.bs.modal", function () {
  $("#lessonFormFill").changeFormFill(`${api}/lesson/add`, "POST");
  $("#lessonFormFill")[0].reset();
});
