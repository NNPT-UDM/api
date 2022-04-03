$(document).on("submit", "#classworkFormFill", function (event) {
  event.preventDefault();
  var form = new FormData($(this)[0]);
  $.ajax({
    method: $(this).attr("method"),
    url: $(this).attr("action"),
    processData: false,
    contentType: false,
    data: form,
    success: function (data) {
      $("#classworkFormFillModal").modal("hide");
      $("#classworkFormFill").trigger("Submitted");
      toastr.clear();
      toastr.success("Success");
    },
    error: function (request, status, error) {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    },
  });
  // var formData = $(this).serializeFormJSON();
  // var request = new XMLHttpRequest();
  // request.open($(this).attr("method"), $(this).attr("action"));
  // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // request.send(formData);
  // request.onload = function () {
  //   if (request.status === 200) {
  //     $("#classworkFormFillModal").modal("hide");
  //     $("classworkFormFill").trigger("Submitted");
  //     toastr.clear();
  //     toastr.success("Success");
  //   } else {
  //     toastr.clear();
  //     toastr.error(JSON.parse(request.response).message || "Error");
  //   }
  // };
});

$(document).ready(function () {
  tinymce.init({
    selector: "textarea#classworkDesc",
    plugins: "link",
    default_link_target: "_blank",
  });
});


