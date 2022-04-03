$(document).on("submit", "#diagnoseFormFill", function (event) {
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
        $("#diagnoseFormFillModal").modal("hide");
        $("#diagnoseFormFill").trigger("Submitted");
      } else {
        toastr.clear();
        toastr.error(JSON.parse(request.response).message || "Error");
      }
    };
  });
  $("#diagnoseFormFillModal").on("hidden.bs.modal", function () {
    $("#diagnoseFormFill").changeFormFill(`${api}/diagnostic/add`, "POST");
    $("#diagnoseFormFill")[0].reset();
  });
  