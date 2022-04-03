$(document).ready(function () {
  var url = $("#user-view").val();
  var me = JSON.parse($("#me").val());
  var webbase = $("#websitebase").val();

  var tableOptions = {
    ajax: {
      url: `${url}`,
      method: "get",
      dataSrc: function (json) {
        $("#classwork-name").text("Homework: " + json.data.title + " - " + json.data.group[0]?.name);
        return json.data.answers;
      },
    },
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
        class: "text-center",
      },
      {
        data: "author",
        render: function (data, type, full, meta) {
          var avtDefault =
            '<div class="avatar-xs d-inline-block me-2">' +
            '<span class="avatar-title rounded-circle bg-light text-body">' +
            data.profile?.display_name[0].toUpperCase() +
            "</span>" +
            "</div>";
          var avt;
          try {
            avt = data.profile?.photo;
            if (avt && avt !== "") {
              if (!isValidWebUrl(avt)) {
                avt = `images/users/${avt}`;
              }
              avt = `<img src="${avt}" alt="" class="avatar-xs rounded-circle me-2">`;
            } else {
              avt = avtDefault;
            }
          } catch (error) {
            avt = avtDefault;
          }

          return `${avt} ${data.profile?.display_name}`;
        },
        // render: function (data, type, full, meta) {
        //   return data;
        // },
      },
      {
        data: "status",
        render: function (data, type, full, meta) {
          if (data === "early") {
            return `<div><span><i class='bx bxs-circle text-success' ></i>Early</span></div>`;
          }
          return `<div><span><i class='bx bxs-circle text-warning' ></i>Late</span></div>`;
        },
      },
      {
        data: "corrections",
        render: function (data, type, full, meta) {
          if (data) {
            return `<div><span><i class='bx bxs-circle text-success' ></i>Yes</span></div>`;
          }
          return `<div><span><i class='bx bxs-circle text-warning' ></i>No</span></div>`;
        },
      },

      {
        data: null,
        render: function (data, type, full, meta) {
          var isActivated = data.activated;

          //   var disabledClass = isActivated ? "" : "\tdisabled";
          return (
            '<ul class="list-inline mb-0">' +
            '<li class="list-inline-item">' +
            '<button type="button" class="px-2 py-1 btn-watch-row\t' +
            '\tbtn btn-info btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#watchAnswerModalScrollable">' +
            '<i class="uil uil-eye font-size-12">' +
            "</i></button></li>" +
            '<li class="list-inline-item">' +
            '<button type="button" class="px-2 py-1 btn-edit-mark-row\t' +
            '\tbtn btn-primary btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#editMarkModalScrollable">' +
            '<i class="uil uil-pen font-size-12">' +
            "</i></button></li>" +
            "</ul>"
          );
        },
      },
    ],
  };
  var table = $("#hrdatatable").DataTable(tableOptions);
  table.on("click", "button.btn-edit-mark-row, button.btn-watch-row ", function () {
    var tr = $(this).closest("tr");
    var data = table.row(tr).data();
    console.log(data);
    console.log($(this).hasClass(".btn-watch-row"));
    if ($(this).hasClass("btn-watch-row")) {
      $("#watch-atttachment").html("");
      if (!!data.attachments.length) {
        arrAttachment = [];
        var htmlAttachment = "";
        for (let attachment of data.attachments) {
          if (!!attachment) {
            htmlAttachment += ` <div class="d-flex flex-row">
            <a class="" href="/s_subs/${attachment.filename}" download
              >${attachment.filename}</a
            >
          </div>`;
          }
        }
        $("#watch-atttachment").html(htmlAttachment);
      }
    }
    if ($(this).hasClass("btn-edit-mark-row")) {
      $("#mark-edit-profile")[0].reset();
      $("#edit-classwork_answer-input").val(data._id);
      $("#show-attachment").html("");

      let dataMark = data.corrections;

      if (!!dataMark) {
        console.log(dataMark);
        $("#mark-edit-profile").attr("method", "put");
        $("#mark-edit-profile").attr("action", dataMark._id);
        $("#edit-score-input").val(dataMark.score);
        if (!!dataMark.attachments.length) {
          arrAttachment = [];
          var htmlAttachment = "";
          for (let attachment of dataMark.attachments) {
            if (!!attachment) {
              htmlAttachment += ` <div class="d-flex flex-row">
                <a class="" href="/docs/${attachment.filename}" download
                  >${attachment.filename}</a
                >
                <button type="button" class="btn p-0 btn-sm delete-attachment" action="${dataMark._id}" data-attachment="${attachment._id}">
                  <i class="bx bx-x text-danger font-size-24"></i>
                </button>
              </div>`;
            }
          }
          $("#show-attachment").html(htmlAttachment);
        }
        $(".delete-attachment").on("click", function (e) {
          e.preventDefault();
          let nodeParent = $(this).parent(".flex-row");
          let url = $("#api").val();
          let action = $(this).attr("action");
          let idAttachment = [$(this).attr("data-attachment")];
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
                url: `${url}/classwork_mark/edit/${action}`,
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
      } else {
        console.log("vao post");
        $("#mark-edit-profile").attr("method", "post");
      }
    }
  });
  console.log("url " + url);
  var urlNo = $("#user-view-no").val();
  var group = $("#id-group").val();
  var tableOptionsNoYet = {
    ajax: {
      url: `${urlNo}/${group}`,
      method: "get",
      dataSrc: function (json) {
        console.log(json.data);
        return json.data;
      },
    },
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
        class: "text-center",
      },
      {
        data: "profile",
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
              if (!isValidWebUrl(avt)) {
                avt = `images/users/${avt}`;
              }
              avt = `<img src="${avt}" alt="" class="avatar-xs rounded-circle me-2">`;
            } else {
              avt = avtDefault;
            }
          } catch (error) {
            avt = avtDefault;
          }
          return `${avt} ${data.display_name}`;
        },
      },
    ],
  };
  $("#hrdatatablenotyet").DataTable(tableOptionsNoYet);
});
$(document).on("submit", "#mark-edit-profile", function (e) {
  e.preventDefault();
  var url = $("#api").val();

  var method = $(this).attr("method");
  var form = new FormData($(this)[0]);
  if (method === "post") {
    $.ajax({
      method: method,
      url: `${url}/classwork_mark/add/`,
      processData: false,
      contentType: false,
      data: form,
      success: function (data) {
        console.log(data);
        toastr.success("Success add mark");

        $("#editMarkModalScrollable").modal("hide");
      },
      error: function (request, status, error) {
        toastr.clear();
        toastr.error("Success add mark");
      },
    });
  } else {
    var action = $(this).attr("action");
    $.ajax({
      method: method,
      url: `${url}/classwork_mark/edit/${action}`,
      processData: false,
      contentType: false,
      data: form,
      success: function (data) {
        console.log(data);
        toastr.success("Success edit mark");

        $("#editMarkModalScrollable").modal("hide");
      },
      error: function (request, status, error) {
        toastr.clear();
        toastr.error("Success edit mark");
      },
    });
  }
});
