var api = $("#api").val();
$("#courseDropBox").on("change", function () {
  if (!!this.value) {
    $.ajax({
      type: "GET",
      url: ` ${api}/course/view?_id=${this.value}`,
      dataType: "json",
      success: function (response) {
        var { groups } = response.data;
        var options = "<option selected disabled>-- Class --</option>";
        Array.from(groups).forEach((group) => {
          options += '<option value="' + group._id + '">' + group.name + "</option>";
        });
        $("#classroomIdRef").html(options);
      },
      error: function (xhr, status, error) {
        toastr.error(error);
      },
    });
  }
});
$(document).on("submit", "#classroomImportFormFill", function (e) {
  e.preventDefault();
  url = $("#api").val();
  var group = $("#classroomIdRef").val();
  if (group) {
    var formData = $(this).serializeFormJSON();
    var request = new XMLHttpRequest();
    request.open("put", `${url}/group/add-members/${group}`);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(formData);
    request.onload = function () {
      if (request.status === 200) {
        toastr.clear();
        toastr.success("Success add student in class");
      } else {
        toastr.clear();
        toastr.error("Error add student in class");
      }
    };
  }
});

$("#userClassroomFormFillModal").on("hidden.bs.modal", function () {
  $("#classroomImportFormFill")[0].reset();
});
