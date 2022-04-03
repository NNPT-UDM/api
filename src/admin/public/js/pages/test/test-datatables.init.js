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

// user datatable
$(document).ready(function () {
  var url = `${$("#api").val()}/quiz/view?`;
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
        data: "title",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: "skill",
        render: function (data, type, full, meta) {
          return data.slug;
        },
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

          return `${avt} <a href="#" class="text-body">${data.profile?.display_name}</a>`;
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
          return (
            '<ul class="list-inline mb-0">' +
            '<li class="list-inline-item">' +
            `<a role="button" href="${webbase}/quiz/${data._id}"` +
            '" class="px-2 py-1 btn btn-light btn-rounded waves-effect">' +
            '<i class="uil uil-external-link-alt font-size-12"></i></a>' +
            "</li>" +
            "</ul>"
          );
        },
      },
    ],
  };

  // init datatable
  $("#testdatatable").DataTable(tableOptions);
});
