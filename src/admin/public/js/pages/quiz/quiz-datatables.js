/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Email summernote Js File
*/
var api = $("#api").val();
var webbase = $("#websitebase").val();
// user datatable
$(document).ready(function () {
  var skillIndex = 0;
  var skillOrigin = $("a.show-by-skill")[0];
  $("#btn-skill-label").text(skillOrigin.textContent);
  var query = skillOrigin.getAttribute("action");

  var url = `${api}/quiz/view?${query}&per_page=1000`;
  var tableOptions = {
    ajax: {
      url: url,
      method: "get",
      dataSrc: function (response) {
        const { data } = response;
        return data || [];
      },
    },
    columns: [
      {
        data: "title",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: "author",
        render: function (data, type, full, meta) {
          return `<a href="#" class="text-body">${data.display_name}</a>`;
        },
      },
      {
        data: "duration",
        render: function (data, type, full, meta) {
          return data / 60;
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
              id: "btnEditQuiz",
              icon: "uil uil-pen",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#quizFormFillModal"',
            },
            {
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              href: `${webbase}/quiz/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  // init datatable
  var table = $("#quizdatatable").DataTable(tableOptions);
  $("div.btn-group > div.dropdown-menu > a.show-by-skill").on("click", function () {
    skillIndex = $("div.btn-group > div.dropdown-menu > a.show-by-skill").index(this);
  });
  $(".show-by-skill").on("click", function () {
    query = $(this).attr("action");
    table.ajax.url(`${api}/quiz/view?${query}&per_page=1000`).load();
    var skillLabel = $("#btn-skill-label");
    var selected = $("div.btn-group > div.dropdown-menu").children("a")[skillIndex];
    skillLabel.text(selected.textContent);
  });

  table.on("click", "button#btnEditQuiz", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    console.log(data);
    $("#quizFormFill").changeFormFill(`${api}/quiz/edit/${data._id}`, "PUT");
    formatFormFill(data);
  });
  $("#quizFormFill").on("Submitted", function (event) {
    table.ajax.reload(null, false);
  });
});
function formatFormFill(data) {
  $("#quiztitle").val(data.title);
  $("#quizduration").val(data.duration / 60);
  $(`#skill-${data.skill}`).prop("checked", true);
}
