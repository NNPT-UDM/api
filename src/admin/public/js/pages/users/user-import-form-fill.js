$(document).on("submit", "#userImportFormFill", function (event) {
  event.preventDefault();
  var formData = new FormData($(this)[0]);
  var request = new XMLHttpRequest();
  request.open($(this).attr("method"), $(this).attr("action"));
  // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");F
  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      toastr.clear();
      toastr.success("Success");
      $("#userImportFormFillModal").modal("hide");
    } else {
      // console.log(request.response);
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});

$("#userImportFormFillModal").on("hidden.bs.modal", function () {
  $("#userImportFormFill")[0].reset();
  $("#showSelectClassroom").hide();
});
