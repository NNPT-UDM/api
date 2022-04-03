var api = $("#api").val();
$(document).ready(function () {
  tinymce.init({
    selector: "#noteContent",
  });
});

$("#userNoteFormFillModal").on("shown.bs.modal", function () {
  $.ajax({
    url: `${api}/learning_note/view?group=${classroomId}&owner=${$("#noteOwnerId").val()}`,
    method: "GET",
    success: function (response) {
      var { data } = response;
      if (data.length > 0) {
        data = data[0];
        $("#userNoteFormFill").changeFormFill(`${api}/learning_note/edit/${data._id}`, "PUT");
        tinymce.get("noteContent").setContent(htmlDecode(data.content));
        $("button[type='submit']").text("Save Change");
      } else {
        $("#userNoteFormFill").changeFormFill(`${api}/learning_note/add`, "POST");
        $("button[type='submit']").text("Save");
      }
    },
  });
});

$("#userNoteFormFillModal").on("hidden.bs.modal", function () {
  $("#userNoteFormFill").changeFormFill(`${api}/learning_note/add`, "POST");
  $("#userNoteFormFill")[0].reset();
});
$(document).on("submit", "#userNoteFormFill", function (event) {
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
      $("#userNoteFormFillModal").modal("hide");
    } else {
      // console.log(request.response);
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});
