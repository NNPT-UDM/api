/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Email summernote Js File
*/
function isValidWebUrl(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}
var api = $("#api").val();

// user datatable
$(document).ready(function () {
  var me = JSON.parse($("#me").val());
  var { _id, role } = me;
  var webbase = $("#websitebase").val();
  var dataSrc;
  if (role.slug === "teacher") {
    $("#classroomApi").val(`${api}/group/view?host=${_id}`);
    dataSrc = function (response) {
      var { data } = response;
      return data;
    };
  } else {
    dataSrc = function (response) {
      var { groups, name } = response.data;
      $("#courseName").text("Course: " + name);
      return groups;
    };
  }
  var url = $("#classroomApi").val();

  var tableOptions = {
    ajax: {
      url: url,
      method: "GET",
      dataSrc: dataSrc,
    },
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
        data: "name",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: "host",
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
      },
      {
        data: "is_online",
        render: function (data, type, full, meta) {
          var badge = data ? "bg-success" : "bg-warning";
          if (data) {
            return `<div><span><i class='bx bxs-circle text-success' ></i>Online</span></div>`;
          }
          return `<div><span><i class='bx bxs-circle text-warning' ></i>Offline</span></div>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return `${data.qty}/${data.max_qty}`;
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
        data: null,
        render: function (data, type, full, meta) {
          var { _id, activated } = data;
          var disabledClass = Boolean(activated) ? "" : "\tdisabled";
          var btn = activated
            ? { color: "btn-success", action: `${api}/group/disable/${data._id}` }
            : { color: "btn-warning", action: `${api}/group/activate/${data._id}` };

          var groupBtns = function () {
            if (["super-admin", "admin", "staff"].includes(role.slug)) {
              return [
                {
                  id: "btnEditClassroom",
                  icon: "uil uil-pen",
                  extra_class: "btn-primary",
                  disable: disabledClass,
                  attrs: 'data-bs-toggle="modal" data-bs-target="#modalClassroomFormFill"',
                },
                {
                  id: `btnApprove${_id}`,
                  icon: "uil uil-check",
                  extra_class: `${btn.color} make-request`,
                  attrs: `method="put" action="${btn.action}"`,
                },
              ];
            }
            return [];
          };
          var btns = [
            ...groupBtns(),
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              disable: disabledClass,
              href: `${webbase}/classroom/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  // init datatable
  var table = $("#classroomdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditClassroom, button.make-request", function (e) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case "btnEditClassroom":
        $("#classroomFormFill").changeFormFill(`${api}/group/edit/${data._id}`, "PUT");
        formatFormFill(data);
        break;
      case `btnApprove${data._id}`:
        $(`#btnApprove${data._id}`).on("Requested", function (event) {
          event.stopPropagation();
          if (event.isPropagationStopped) {
            // console.log(data._id);
            table.ajax.reload(null, false);
          }
        });
        break;
      default:
        break;
    }
  });

  $("#classroomFormFill").on("Submitted", function (event) {
    table.ajax.reload(null, false);
  });
});
function formatFormFill(data) {
  $("#classroomName").val(data.name);
  $("#classroomQuantity").val(data.max_qty);
  $(`input[value='${data.is_online}']`).prop("checked", true);
  $("#classroomHost").val(data.host._id);
}
