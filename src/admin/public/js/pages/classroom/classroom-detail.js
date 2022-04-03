var webbase = $("#websitebase").val();
var api = $("#api").val();
var classroomId = $("#classroomId").val();
function ajaxInit(cb) {
  var url = `${api}/group/view?_id=${classroomId}`;
  $.ajax({
    url: url,
    method: "GET",
  }).done(function (response) {
    cb(response.data);
  });
}

$(document).ready(
  ajaxInit(function (response) {
    var { name, members, lessons, classworks, qty, logbook } = response;
    $("#classroomName").text("Class: " + name);
    $("#qtyMems").val(qty);
    generateStudentTable(members, lessons);
    generateLessonTable(lessons);
    generateClassworkTable(classworks);
    generateLogBook(logbook);
  })
);

function generateStudentTable(members = [], lessons = []) {
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
        data: null,
        render: function (data, type, full, meta) {
          var avtDefault =
            '<div class="avatar-xs d-inline-block me-2">' +
            '<span class="avatar-title rounded-circle bg-light text-body">' +
            data.display_name[0].toUpperCase() +
            "</span>" +
            "</div>";
          var avt;
          try {
            avt = data.photo;
            if (avt && avt !== "") {
              avt = `<img src="images/users/${avt}" alt="" class="avatar-xs rounded-circle me-2">`;
            } else {
              avt = avtDefault;
            }
          } catch (error) {
            avt = avtDefault;
          }

          return `${avt} <a href="#" class="text-body">${data.display_name}</a>`;
        },
      },
      {
        data: "email",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: "activated",
        render: function (data, type, full, meta) {
          var badge = data ? "bg-success" : "bg-warning";
          return `<div><span class="badge ${badge} ">${data}</span></div>`;
        },
      },
      {
        data: "last_access",
        render: function (data, type, full, meta) {
          return new Date(data).toLocaleString("vi-VN");
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var { _id, activated } = data;
          var disabledClass = Boolean(activated) ? "" : "\tdisabled";
          var btns = [
            {
              id: "btnUserSkillFormFill",
              icon: "bx bx-bar-chart",
              extra_class: "btn-warning",
              disable: disabledClass,
              attrs: 'data-bs-toggle="modal" data-bs-target="#userSkillFormFillModal"',
            },
            {
              id: "btnEditNote",
              icon: "bx bx-note",
              extra_class: "btn-info",
              attrs: 'data-bs-toggle="modal" data-bs-target="#userNoteFormFillModal"',
            },
            {
              id: "btnAddReview",
              icon: "bx bxs-comment-add",
              extra_class: "btn-primary",
              disable: disabledClass,
              attrs: 'data-bs-toggle="modal" data-bs-target="#reviewFormFillModal"',
            },
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              disable: disabledClass,
              href: `${webbase}/contacts-profile/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#studentdatatable").DataTable(tableOptions);
  table.on("click", "button#btnUserSkillFormFill, button#btnAddReview, button#btnEditNote", function () {
    var tr = $(this).closest("tr");
    var data = table.row(tr).data();
    switch ($(this).attr("id")) {
      case "btnUserSkillFormFill":
        $("#my_learning").val(data._id);
        console.log($("#my_learning").val());
        break;
      case "btnAddReview":
        $("#reviewOwnerId").val(data._id);
        break;
      case "btnEditNote":
        $("#noteGroupId").val(classroomId);
        $("#noteOwnerId").val(data._id);
        break;
      default:
        break;
    }
  });
  var opts = $("#lessonIdRef").children("option");
  if (opts.length < 2) {
    Array.from(lessons).forEach((lesson) => {
      var option = new Option(lesson.title, lesson._id);
      $(option).html(lesson.title);
      $("#lessonIdRef").append(option);
    });
  }
}

function generateLessonTable(lessons = []) {
  let tableOptions = {
    data: lessons,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: "title",
        render: function (data, type, full, meta) {
          return `<span>${data}</span>`;
        },
      },
      {
        data: "date",
        render: function (data, type, full, meta) {
          return new Date(data).toLocaleString("vi-VN");
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var { _id } = data;
          var btns = [
            {
              id: "btnEditLesson",
              icon: "uil uil-pen",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#lessonFormFillModal"',
            },

            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              href: `${webbase}/lesson/${_id}/${classroomId}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };

  // init datatable
  let table = $("#lessondatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditLesson", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case "btnEditLesson":
        $("#lessonFormFill").changeFormFill(`${api}/lesson/edit/${data._id}`, "PUT");
        $("#lessonTitle").val(data.title);
        var d = getFormattedDate(new Date(data.date));

        $("#lessonDate").val(d);
        break;
      default:
        break;
    }
  });
  $("#lessonFormFill").on("Submitted", function (event) {
    ajaxInit(function (response) {
      var { name, members, lessons, classworks } = response;
      table.clear();
      table.rows.add(lessons);
      table.draw();
    });
  });
}

function generateClassworkTable(classworks = []) {
  let tableOptions = {
    data: classworks,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
        class: "text-center",
      },
      {
        data: "title",
        render: function (data, type, full, meta) {
          return data;
        },
      },

      {
        data: "deadline",
        render: function (data, type, full, meta) {
          return new Date(data).toLocaleString("vi-VN");
        },
      },
      {
        data: "count_answers",
        render: function (data, type, full, meta) {
          return "<h6>" + data + "/" + $("#qtyMems").val() + "</h6>";
        },
        class: "text-center",
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var { _id } = data;
          var btns = [
            {
              id: "btnEditClasswork",
              icon: "uil uil-pen",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#classworkFormFillModal"',
            },
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              href: `${webbase}/classwork/${_id}/${classroomId}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };

  // init datatable
  let table = $("#classworkdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditClasswork", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case "btnEditClasswork":
        $("#classworkFormFill").changeFormFill(`${api}/classwork/edit/${data._id}`, "PUT");
        console.log(data);
        $("#classworkTitle").val(data.title);
        var d = getFormattedDate(new Date(data.deadline));
        tinymce.get("classworkDesc").setContent(data.description);
        $("#classworkDeadline").val(d);

        if (!!data.attachments.length) {
          arrAttachment = [];
          var htmlAttachment = "";
          for (let attachment of data.attachments) {
            console.log(!!attachment, "attachment");
            if (!!attachment) {
              htmlAttachment += ` <div class="d-flex flex-row">
                <a class="" href="/docs/${attachment.filename}" download
                  >${attachment.filename}</a
                >
                <button type="button" class="btn p-0 btn-sm delete-attachment" action="${data._id}" data-attachment="${attachment._id}">
                  <i class="bx bx-x text-danger font-size-24"></i>
                </button>
              </div>`;
            }
          }
          $("#show-attachment").html(htmlAttachment);
          $(".delete-attachment").on("click", function (e) {
            e.preventDefault();
            let nodeParent = $(this).parent(".flex-row");
            let url = $("#api").val();
            let action = $(this).attr("action");
            let attachmentId = [$(this).attr("data-attachment")];
            let json = {
              pull: {
                attachments: {
                  in: attachmentId,
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
                  url: `${url}/classwork/edit/${action}`,
                  contentType: "application/json",
                  dataType: "json",
                  data: JSON.stringify(json),
                  success: function (data) {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    nodeParent.addClass("d-none");
                    $("#classworkFormFill").trigger("Submitted");
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
        break;
      default:
        break;
    }
  });

  $("#classworkFormFill").on("Submitted", function (event) {
    ajaxInit(function (response) {
      var { name, members, lessons, classworks } = response;
      table.clear();
      table.rows.add(classworks);
      table.draw();
    });
  });
  $("#classworkFormFillModal").on("hidden.bs.modal", function () {
    $("#classworkFormFill").changeFormFill(`${api}/classwork/add`, "POST");
    $("#classworkFormFill")[0].reset();
  });
  $("#classworkFormFill").parsley();
}
function generateLogBook(logbook = {}) {
  if (!jQuery.isEmptyObject(logbook)) {
    $("#add-new-diagnoses").text("Edit Diagnoses");
    $("#diagnosesClassroomFormFill").changeFormFill(`${api}/logbook/edit/${logbook._id}`, "PUT");
  }
  var skillIndex = 0;
  var skillOrigin = $("a.show-by-skill-diagnose")[0];
  $("#btn-skill-label").text(skillOrigin.textContent);
  var query = skillOrigin.getAttribute("action");
  let logs = logbook?.logs || [];
  let dataLogs = [];
  console.log(logs);
  if (logs.length) {
    $("#diagnosticsGroup").val(JSON.stringify(logs || []));
    dataLogs = logs.filter((x) => x.diagnostic.skill === query);
  }
  let tableOptions = {
    data: dataLogs,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: "diagnostic",
        render: function (data, type, full, meta) {
          return data.type;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `<input type="checkbox" class="checkbox-${data._id}" name="logs.lessons" value="1" ${
            data.lessons.includes("1") ? "checked" : ""
          }>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `<input type="checkbox" class="checkbox-${data._id}" name="logs.lessons" value="2" ${
            data.lessons.includes("2") ? "checked" : ""
          }>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `<input type="checkbox" class="checkbox-${data._id}" name="logs.lessons" value="3" ${
            data.lessons.includes("3") ? "checked" : ""
          }>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `<input type="checkbox" class="checkbox-${data._id}" name="logs.lessons" value="4" ${
            data.lessons.includes("4") ? "checked" : ""
          }>`;
        },
      },
      {
        data: "activated",
        render: function (data, type, full, meta) {
          var badge = Boolean(data) ? "bg-success" : "bg-warning";
          return `<div><span class="badge ${badge} ">${data}</span></div>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `<textarea name="logs.notes">${data.notes}</textarea>`;
        },
      },
    ],
  };

  // init datatable
  let table = $("#logbookdatatable").DataTable(tableOptions);
  $("div.btn-group > div.dropdown-menu > a.show-by-skill-diagnose").on("click", function () {
    skillIndex = $("div.btn-group > div.dropdown-menu > a.show-by-skill-diagnose").index(this);
  });
  $(".show-by-skill-diagnose").on("click", function () {
    query = $(this).attr("action");
    var skillLabel = $("#btn-skill-label");
    var selected = $("div.btn-group > div.dropdown-menu").children("a")[skillIndex];
    skillLabel.text(selected.textContent);
    var skillSelected = selected.getAttribute("action");
    if (logs.length) {
      dataLogs = logs.filter((x) => x.diagnostic.skill === skillSelected) || [];
    }
    table.clear();
    table.rows.add(dataLogs);
    table.draw();
  });
  table.on("change", "input[name='logs.lessons'], textarea[name='logs.notes']", function (e) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("name")) {
      case "logs.lessons":
        var lessons = [];
        $(`.checkbox-${data._id}`).each((_, el) => {
          console.log(el);
          if ($(el).is(":checked")) lessons.push($(el).val());
        });
        console.log(lessons);
        $.ajax({
          url: `${api}/logbook/edit-log/${data._id}`,
          contentType: "application/json; charset=UTF-8",
          method: "PUT",
          data: JSON.stringify({ lessons }),
        });
        break;
      case "logs.notes":
        $.ajax({
          url: `${api}/logbook/edit-log/${data._id}`,
          method: "PUT",
          data: { notes: $("textarea[name='logs.notes']").val() },
        });
        break;
      default:
        break;
    }
  });
}
$("#classroomTabs a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});
