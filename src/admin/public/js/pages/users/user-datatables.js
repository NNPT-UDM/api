/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Email summernote Js File
*/

var api = $("#api").val();
function isValidWebUrl(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}

function format(user) {
  var roleFormCheckHTML = "";
  $.each($("#selectRoleView").children("option"), function (index, option) {
    var roleId = $(option).val();
    var roleName = $(option).text();
    var checked = roleId === user.role ? "checked" : "";
    roleFormCheckHTML +=
      '<div class="col-12 form-check">' +
      `<input class="form-check-input" type="radio" name="role" id="${roleId}" value="${roleId}" ${checked}>` +
      `<label class="form-check-label" for="${roleId}">${roleName}</label>` +
      "</div>";
  });

  $(document).on("submit", `form#form-${user._id}`, function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var url = api;

    var json = {
      role: $(this).serializeArray()[0].value,
    };

    var request = new XMLHttpRequest();
    request.open("put", `${url}/user/edit/${user._id}`);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(json));

    request.onload = function () {
      if (request.status === 200) {
        toastr.clear();
        toastr.success("Success role update");
      } else {
        toastr.clear();
        toastr.error("Error role update");
      }
      $("#hrdatatable").DataTable().ajax.reload(null, false);
    };
  });

  return (
    `<form id="form-${user._id}" class="row row-cols-lg-auto gx-3 gy-2 align-items-center">` +
    roleFormCheckHTML +
    '<div class="col-12">' +
    '<button type="submit" class="btn btn-primary">Change Role</button>' +
    "</div>" +
    "</form>"
  );
}
function URLString(api, query) {
  return `${api}/role/view?${query}`;
}
// user datatable
$(document).ready(function () {
  var api = $("#api").val();
  var url = "";
  var me = JSON.parse($("#me").val());
  var webbase = $("#websitebase").val();

  var opts = $("#selectRoleView").children("option");
  if (opts.length < 2) {
    $.ajax({
      url: `${api}/role/view?sort=index`,
      method: "GET",
      success: function (result) {
        const { data } = result;
        if (data.length > 0) {
          data.forEach((role) => {
            var option = new Option(role.name, role._id);
            $(option).html(role.name);
            $("#selectRoleView").append(option);
            $("#userRole").append(new Option(role.name, role._id));
            $("#selectRoleImport").append(new Option(role.name, role._id));
          });
          url = URLString(api, `_id=${data[0]._id}`);
          var tableOptions = {
            ajax: {
              url: url,
              method: "GET",
              dataSrc: function (response) {
                const { users } = response.data;
                return users || [];
              },
            },
            // retrieve: true,
            columns: [
              {
                data: null,
                render: function (data, type, full, meta) {
                  return "<strong>" + (meta.row + 1) + "</strong>";
                },
              },
              {
                data: "profile",
                render: function (data, type, full, meta) {
                  var avtDefault =
                    '<div class="avatar-xs d-inline-block me-2">' +
                    '<span class="avatar-title rounded-circle bg-light text-body">' +
                    data?.display_name[0].toUpperCase() +
                    "</span>" +
                    "</div>";
                  var avt;
                  try {
                    avt = data?.photo;
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

                  return `${avt} <a href="#" class="text-body">${data?.display_name}</a>`;
                },
              },
              {
                data: "credential",
                render: function (data, type, full, meta) {
                  return data?.email;
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
                data: "last_access",
                render: function (data, type, full, meta) {
                  return new Date(data).toLocaleString("vi-VN");
                },
              },
              {
                data: null,
                render: function (data, type, full, meta) {
                  var { _id, activated } = data;
                  var btn = activated
                    ? { color: "btn-success", action: `${api}/user/disable/${data._id}` }
                    : { color: "btn-warning", action: `${api}/user/activate/${data._id}` };
                  var disabledClass = Boolean(activated) ? "" : "\tdisabled";
                  var btnGroupByRole = [];
                  switch ($("#selectRoleView option:selected").text()) {
                    case "Student":
                      btnGroupByRole = [
                        {
                          id: "btnImportUserToClassroom",
                          icon: "bx bx-import",
                          extra_class: "btn-outline-info",
                          disable: disabledClass,
                          attrs: 'data-bs-toggle="modal" data-bs-target="#userClassroomFormFillModal"',
                        },
                      ];
                      break;
                    case "Teacher":
                      btnGroupByRole = [
                        {
                          id: "btnShowAssignedClass",
                          icon: "bx bxs-grid-alt",
                          extra_class: "btn-outline-info",
                          disable: disabledClass,
                          attrs: 'data-bs-toggle="modal" data-bs-target="#assignedClassroomModal"',
                        },
                      ];
                      break;
                    default:
                      break;
                  }
                  var btns = [
                    {
                      id: "btnEditUserProfile",
                      icon: "uil uil-pen",
                      extra_class: "btn-primary",
                      disable: disabledClass,
                      attrs: 'data-bs-toggle="modal" data-bs-target="#userProfileFormFillModal"',
                    },
                    ...btnGroupByRole,
                    {
                      id: "btnExpandRow",
                      icon: "uil uil-exclamation-triangle",
                      extra_class: "btn-warning",
                      disable: disabledClass,
                    },
                    {
                      id: `btnApprove${_id}`,
                      icon: "uil uil-check",
                      extra_class: `${btn.color} make-request`,
                      attrs: `method="put" action="${btn.action}"`,
                    },
                    {
                      id: "",
                      icon: "uil uil-external-link-alt",
                      extra_class: "btn-light",
                      disable: disabledClass,
                      href: `${webbase}/contacts-profile/${_id}`,
                    },
                  ];
                  return !(me._id === data._id) ? generateBtnActions(btns) : "";
                },
              },
            ],
          };
          // init datatable
          var table = $("#hrdatatable").DataTable(tableOptions);
          table.on(
            "click",
            "button#btnExpandRow, button#btnEditUserProfile, button#btnImportUserToClassroom, button#btnShowAssignedClass, button.make-request",
            function (event) {
              var tr = $(this).closest("tr");
              var row = table.row(tr);
              var data = row.data();
              switch ($(this).attr("id")) {
                case "btnExpandRow":
                  if (row.child.isShown()) {
                    tr.removeClass("details");
                    row.child.hide();
                  } else {
                    tr.addClass("details");
                    row.child(format(data)).show();
                  }
                  break;
                case "btnEditUserProfile":
                  $("#newUser").hide();
                  $("#editUser").show();
                  $("#editUser #userRoleId").attr("name", "role");
                  $("#userProfileFormFill").changeFormFill(`${api}/user/edit/${data._id}`, "PUT");
                  formatFormFill(data);
                  break;
                case "btnImportUserToClassroom":
                  $("#studentDisplayName").text(data.profile?.display_name);
                  $("#userIdBelongRow").val(data._id);
                  break;
                case "btnShowAssignedClass":
                  $("#teacherId").val(data._id);
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
            }
          );

          $("#selectRoleView").on("change", function (event) {
            url = URLString(api, `_id=${$(this).val()}`);
            table.ajax.url(url).load();
          });
          $("#selectRoleImport").on("change", function (event) {
            var val = $("#selectRoleImport option:selected").text();
            if (val === "Student") $("#showSelectClassroom").show();
            else $("#showSelectClassroom").hide();
          });
        }
      },
    });
  }

  $("#userProfileFormFillModal").on("hidden.bs.modal", function () {
    $("#userProfileFormFill").changeFormFill(`${api}/user/add`, "POST");
    $("#userProfileFormFill")[0].reset();
    $("#newUser").show();
    $("#editUser").hide();
    $("#editUser #userRoleId").removeAttr("name");
  });
  // $("#userProfileFormFill").parsley();

  $("#userImportFormFillModal").on("shown.bs.modal", function () {
    if ($("#selectClassroomImport").children("option").length > 1) return;
    $.ajax({
      url: `${api}/group/view`,
      method: "GET",
      success: function (response) {
        let { data } = response;
        data = data.forEach((group) => {
          var option = new Option(group.name, group._id);
          $("#selectClassroomImport").append(option);
        });
      },
    });
  });
});

function formatFormFill(data) {
  $("#userRoleId").val(data.role);
  $("#userDisplayName").val(data.profile?.display_name);
  $("#userUserName").val(data.credential.username);
  $("#userEmail").val(data.credential.email);
  $("#userPhone").val(data.credential.phone);
  $("#userAddress").val(data.profile?.contacts?.address);
  $("#userGender").val(data.profile?.gender);
  $("#userBio").val(data.profile?.bio);
  $("#userFacebook").val(data.profile?.contacts?.social_network?.facebook);
  $("#userInstagram").val(data.profile?.contacts?.social_network?.instagram);
}
