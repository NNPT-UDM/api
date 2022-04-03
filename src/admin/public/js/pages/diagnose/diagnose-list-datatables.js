var api = $("#api").val();
var webbase = $("#websitebase").val();
$(document).ready(function () {
  var skillIndex = 0;
  var skillOrigin = $("a.show-by-skill")[0];
  console.log(skillOrigin)
  $("#btn-skill-label").text(skillOrigin.textContent);
  var query = skillOrigin.getAttribute("action");
  console.log(skillOrigin);

  var url = `${api}/diagnostic/view?skill=${query}&per_page=1000`;
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
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: "type",
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
              id: "btnEditDiagnose",
              icon: "uil uil-pen",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#diagnoseFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  // init datatable
  var table = $("#diagnosedatatable").DataTable(tableOptions);
  $("div.btn-group > div.dropdown-menu > a.show-by-skill").on("click", function () {
    skillIndex = $("div.btn-group > div.dropdown-menu > a.show-by-skill").index(this);
  });
  $(".show-by-skill").on("click", function () {
    query = $(this).attr("action");
    table.ajax.url(`${api}/diagnostic/view?skill=${query}&per_page=1000`).load();
    var skillLabel = $("#btn-skill-label");
    var selected = $("div.btn-group > div.dropdown-menu").children("a")[skillIndex];
    skillLabel.text(selected.textContent);
  });

  table.on("click", "button#btnEditDiagnose", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    console.log(data);
    $("#diagnoseType").val(data.type);
    $("#diagnoseSkill").val(data.skill);
   
    $("#diagnoseFormFill").changeFormFill(`${api}/diagnostic/edit/${data._id}`, "PUT");
    // formatFormFill(data);
  });
  $("#diagnoseFormFill").on("Submitted", function (event) {
    table.ajax.reload(null, false);
  });
});
