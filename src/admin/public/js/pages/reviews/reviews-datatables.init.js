$(document).ready(function () {
  var url = `${$("#api").val()}/course/view?`;
  var me = JSON.parse($("#me").val());
  var webbase = $("#websitebase").val();
  var currentLocation = window.location;
  var tableOptions = {
    //   ajax: {
    //     url: `${url}&per_page=1000000`,
    //     method: "get",
    //     dataSrc: "data",
    //   },
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
        data: "author",
        render: function (data, type, full, meta) {
          let avtDefault =
            '<div class="avatar-xs d-inline-block me-2">' +
            '<span class="avatar-title rounded-circle bg-light text-body">' +
            data.profile?.display_name[0].toUpperCase() +
            "</span>" +
            "</div>";
          let avt;
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
        data: "student",
        render: function (data, type, full, meta) {
          let avtDefault =
            '<div class="avatar-xs d-inline-block me-2">' +
            '<span class="avatar-title rounded-circle bg-light text-body">' +
            data.profile?.display_name[0].toUpperCase() +
            "</span>" +
            "</div>";
          let avt;
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
        data: null,
        render: function (data, type, full, meta) {
          return (
            '<ul class="list-inline mb-0">' +
            '<li class="list-inline-item">' +
            '<button type="button" class="px-2 py-1 btn-edit-course-row\t' +
            '\tbtn btn-primary btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#courseFormFillModal">' +
            '<i class="uil uil-pen font-size-12">' +
            "</i></button></li>" +
            "</ul>"
          );
        },
      },
    ],
  };

  //   var table = $("#reviewdatatable").DataTable(tableOptions);
});
