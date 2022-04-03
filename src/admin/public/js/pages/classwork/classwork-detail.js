var webbase = $("#websitebase").val();
var api = $("#api").val();
var classworkId = $("#classworkId").val();
var classroomId = $("#classroomId").val();
function ajaxInit(cb) {
  var url = `${api}/classwork/view?_id=${classworkId}`;
  $.ajax({
    url: url,
    method: "GET",
  }).done(function (response) {
    const { data } = response;
    data.group.forEach((group) => {
      var option = new Option(group.name, group._id);
      $(option).html(group.name);
      $("#selectClassroomAssigned").append(option);
      if (classroomId === group._id.toString()) $("#selectClassroomAssigned").val(group._id);
    });
    cb(data);
  });
}

$(document).ready(
  ajaxInit(function (response) {
    var {
      title,
      description,
      attachments,
      time_left,
      author,
      answers,
      count_answers,
      group,
      assigned,
      missing,
    } = response;
    $("#classworkTitle").text(title);
    // $("#count_answers").text(count_answers);
    generateAnswerTable(answers);
    generateMissingTable(missing);
  })
);

function generateAnswerTable(answers = []) {
  var classroomSelected = $("#selectClassroomAssigned").val();
  var classroom = answers.filter((group) => `${group._id}` === `${classroomSelected}`)[0];
  var { members } = classroom;
  var tableOptions = {
    data: members,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: "author",
        render: function (data, type, full, meta) {
          return data.display_name;
        },
      },
      {
        data: "status",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var { _id } = data;
          var btns = [
            {
              id: `btnEditAnswer`,
              icon: "bx bxs-edit",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#classworkMarkFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#answerdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditAnswer", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case `btnEditAnswer`:
        console.log(data);
        let dataMark = data.corrections;
        if (!!dataMark) {
          $("#classworkMarkFormFill").changeFormFill(`${api}/classwork_mark/edit/${dataMark._id}`, "PUT");
          $("#classworkAnswerId").val(data._id);
          $("#classworkAnswerScore").val(dataMark.score);
          $("#classworkAnswerRubric").val(dataMark.rubric);
          if (!!data.attachments.length) {
            console.log(data.attachments);
            const attachmentAnswer = renderAttachmentAnswer(data.attachments);
            $("#classworkAnswerAttachmentShow").html(attachmentAnswer);
          }
          const attachmentMark = renderAttachmentMark(dataMark.attachments, dataMark._id);
          $("#classworkMarkAttachmentShow").html(attachmentMark);
          deleteAttachmentMark();
        } else {
          $("#classworkAnswerId").val(data._id);
          $("#classworkMarkFormFill").changeFormFill(`${api}/classwork_mark/add/`, "POST");
        }
        break;
      default:
        break;
    }
  });

  $("#selectClassroomAssigned").on("change", function (event) {
    var classroomId = $(this).val();
    var classroom = answers.filter((group) => `${group._id}` === `${classroomId}`)[0];
    var { members } = classroom;
    table.clear();
    table.rows.add(members);
    table.draw();
  });
  $("#classworkMarkFormFill").on("Submitted", function (event) {
    ajaxInit(function (response) {
      var { answers } = response;
      var classroomSelected = $("#selectClassroomAssigned").val();
      var classroom = answers.filter((group) => `${group._id}` === `${classroomSelected}`)[0];
      var { members } = classroom;
      table.clear();
      table.rows.add(members);
      table.draw();
    });
  });
}
const renderAttachmentAnswer = (data = []) => {
  var htmlAttachment = "";
  data.map((item) => {
    htmlAttachment += ` <div class="d-flex flex-row">
    <a class="" href="/docs/${item.filename}" download
      >${item.filename}</a
    >
  </div>`;
  });
  return htmlAttachment;
};
const renderAttachmentMark = (data = [], id = "") => {
  var htmlAttachment = "";
  data.map((item) => {
    htmlAttachment += ` <div class="d-flex flex-row">
    <a class="" href="/docs/${item.filename}" download
      >${item.filename}</a
    >
    <button type="button" class="btn p-0 btn-sm delete-attachment-mark" action="${id}" data-attachment="${item._id}">
      <i class="bx bx-x text-danger font-size-24"></i>
    </button>
  </div>`;
  });
  return htmlAttachment;
};
function deleteAttachmentMark() {
  $(".delete-attachment-mark").on("click", function (e) {
    e.preventDefault();
    let nodeParent = $(this).parent(".flex-row");
    let action = $(this).attr("action");
    let idAttachment = [$(this).attr("data-attachment")];
    console.log(idAttachment, action);
    let json = {
      pull: {
        attachments: {
          in: idAttachment,
        },
      },
    };
    console.log("json " + JSON.stringify(json));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          method: "PUT",
          url: `${api}/classwork_mark/edit/${action}`,
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(json),
          success: function (data) {
            // toastr.success("Success delete");
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            nodeParent.addClass("d-none");
          },
          error: function (request, status, error) {
            toastr.clear();
            Swal.fire("Oops...", "Something went wrong!", "error");
          },
        });
      }
    });
  });
}
function generateMissingTable(missing = []) {
  var classroomSelected = $("#selectClassroomAssigned").val();
  var classroom = missing.filter((group) => `${group._id}` === `${classroomSelected}`)[0];
  var { members } = classroom;
  let tableOptions = {
    data: members,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: "display_name",
        render: function (data, type, full, meta) {
          return data;
        },
      },
    ],
  };

  // init datatable
  let table = $("#missingdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditLesson", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case "btnEditLesson":
        $("#lessonFormFill").changeFormFill(`${api}/lesson/edit/${data._id}`, "PUT");
        $("#lessonTitle").val(data.title);
        var d = new Date(data.date).toLocaleString("vi-VN");
        console.log(d);
        $("#lessonDate").val();
        break;
      default:
        break;
    }
  });
  $("#selectClassroomAssigned").on("change", function (event) {
    var classroomId = $(this).val();
    var classroom = missing.filter((group) => `${group._id}` === `${classroomId}`)[0];
    var { members } = classroom;
    table.clear();
    table.rows.add(members);
    table.draw();
  });
}

$("#classworkTabs a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});
