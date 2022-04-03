$(document).on("submit", "#quizFormFill", function (event) {
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
      $("#quizFormFillModal").modal("hide");
      $("#quizFormFill").trigger("Submitted");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});
$("#quizFormFillModal").on("hidden.bs.modal", function () {
  $("#quizFormFill").changeFormFill(`${api}/quiz/add`, "POST");
  $("#quizFormFill")[0].reset();
});
