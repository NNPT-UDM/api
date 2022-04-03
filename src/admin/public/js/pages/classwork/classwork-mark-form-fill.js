var api = $("#api").val();
$(document).on("submit", "#classworkMarkFormFill", function (e) {
  e.preventDefault();
  console.log("vao day");
  var formData = new FormData($(this)[0]);
  var method = $(this).attr("method");
  var action = $(this).attr("action");
  var request = new XMLHttpRequest();
  request.open(method, action);

  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      $("#classworkMarkFormFillModal").modal("hide");
      $("#classworkMarkFormFill").trigger("Submitted");
      toastr.clear();
      toastr.success("Success");
    } else {
      toastr.clear();
      toastr.error("Error");
    }
  };
});

$("#classworkMarkFormFillModal").on("hidden.bs.modal", function () {
  $("#classworkMarkFormFill").changeFormFill(`${api}/classwork_mark/add`, "POST");
  $("#classworkMarkFormFill")[0].reset();
  $("#classworkAnswerAttachmentShow").html("");
});
