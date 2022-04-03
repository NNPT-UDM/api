var api = $("#api").val();
console.log(api);

$(document).ready(function () {
  var opts = $("#classroomHost").children("option");
  if (opts.length < 2) {
    $.ajax({
      url: `${api}/role/view?slug=teacher`,
      method: "GET",
      success: function (result) {
        const { users } = result.data;
        if (users.length > 0) {
          return users.map((user) => {
            var option = new Option(user.profile?.display_name, user._id);
            $(option).html(user.profile?.display_name);
            $("#classroomHost").append(option);
          });
        }
      },
    });
  }
});

$(document).on("submit", "#classroomFormFill", function (e) {
  e.preventDefault();
  var formData = $(this).serializeFormJSON();
  var method = $(this).attr("method");
  var action = $(this).attr("action");
  var request = new XMLHttpRequest();
  request.open(method, action);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      $("#modalClassroomFormFill").modal("hide");
      $("#classroomFormFill").trigger("Submitted");
      toastr.clear();
      toastr.success("Success student's skill update");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error student's skill update");
    }
  };
});

$("#modalClassroomFormFill").on("hidden.bs.modal", function () {
  $("#classroomFormFill").changeFormFill(`${api}/group/add`, "POST");
  $("#classroomFormFill")[0].reset();
});
