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

$("#btnAddCourse").on("click", function () {
  $("#courseFormFill")[0].reset();
  $(document).on("submit", " #courseFormFill", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var url = $("#api").val();
    var form = $("#courseFormFill").serialize();

    var request = new XMLHttpRequest();

    request.open("post", `${url}/course/add`);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(form);

    request.onload = function () {
      if (request.status === 200) {
        toastr.clear();
        toastr.success("Success course create");
        $("#addCourseModalScrollable").modal("hide");
      } else {
        const response = JSON.parse(request.response);
        toastr.clear();
        toastr.error("Error course create");
      }
      $("#coursesdatatable").DataTable().ajax.reload(null, false);
    };
  });
});
// user datatable
$(document).ready(function () {
  var url = `${$("#api").val()}/course/view?`;
  var me = JSON.parse($("#me").val());
  var webbase = $("#websitebase").val();
  var tableOptions = {
    ajax: {
      url: `${url}&per_page=1000000`,
      method: "get",
      dataSrc: "data",
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
        data: "name",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: "create_at",
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
              id: "btnEditCourse",
              icon: "uil uil-pen",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#courseFormFillModal"',
            },
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              href: `${webbase}/courses/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#coursesdatatable").DataTable(tableOptions);
  table.on("click", "#btnEditCourse", function () {
    var tr = $(this).closest("tr");
    var data = table.row(tr).data();
    $("#edit-name-input").val(data.name);
    $("#course-edit-profile").attr("action", data._id);
    $("#courseFormFillModal").modal("show");
  });
  // init datatable
  $("#course-edit-profile").on("submit", function (e) {
    e.preventDefault();
    var url = $("#api").val();
    var action = $(this).attr("action");
    var form = $("#course-edit-profile").serialize();
    var request = new XMLHttpRequest();
    request.open("put", `${url}/course/edit/${action}`);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(form);
    request.onload = function () {
      if (request.status === 200) {
        toastr.clear();
        toastr.success("Success course update");
        $("#courseFormFillModal").modal("hide");
      } else {
        toastr.clear();
        toastr.error("Error course update");
      }
      $("#coursesdatatable").DataTable().ajax.reload(null, false);
    };
  });
  $("#courseFormFill").parsley();
});
