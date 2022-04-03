var classroomId = $("#classroomId").val();
$("#diagnosesClassroomFormFillModal").on("shown.bs.modal", function (e) {
  var diagnosticsGroup = JSON.parse($("#diagnosticsGroup").val() || "[]");
  $.ajax({
    url: `${api}/skill/view`,
    method: "GET",
    success: function (response) {
      const { data } = response;
      // console.log(data);
      const html = data.map((dt) => {
        const { name, diagnostics } = dt;
        const rows = diagnostics.map((dia) => {
          const isChecked = diagnosticsGroup.some((e) => e.diagnostic._id === dia._id);
          return `
          <div class="row m-0 p-1 border-bottom">
            <div class="col-1 border-end text-center"><input class="form-check-input" type="checkbox" name="logs.diagnostic" value="${
              dia._id
            }" id="${dia._id}" ${isChecked ? "checked" : ""}/></div>
            <div class="col-11">
              <p class="m-0">${dia.type}</p>
            </div>
          </div>`;
        });
        return `
            <div class="row m-0">
              <div class="col-2 border">
                <div class="outer">
                  <div class="inner rotate">${name}</div>
                </div>
              </div>
              <div class="col-10 border-top p-0 d-flex flex-column justify-content-between">
              ${rows.join("")}
              </div>
            </div>
        `;
      });
      $("#diagnosticCheckList").html(html);
    },
  });
});
$(document).on("submit", "#diagnosesClassroomFormFill", function (event) {
  event.preventDefault();
  var diagnosticArray = [];
  $("#diagnosesClassroomFormFill input[name='logs.diagnostic']:checked").each((indx, e) => {
    diagnosticArray.push($(e).val());
  });

  let jsonDiagnose = diagnosticArray.map((e, idx) => {
    return {
      diagnostic: e,
      lessons: [],
      notes: "",
    };
  });
  let jsonSubmit = {
    group: classroomId,
    logs: jsonDiagnose,
  };
  console.log(jsonSubmit);

  var request = new XMLHttpRequest();
  request.open($(this).attr("method"), $(this).attr("action"));
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(jsonSubmit));
  request.onload = function () {
    if (request.status === 200) {
      $("#diagnosesClassroomFormFillModal").modal("hide");
      $("#diagnosesClassroomFormFill").trigger("Submitted");
      toastr.clear();
      toastr.success("Success");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});
