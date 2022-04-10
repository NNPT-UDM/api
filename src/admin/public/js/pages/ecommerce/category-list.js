$(document).ready(function () {
  generateProductListTable();
});

function generateProductListTable() {
  var api = $("#api").val();
  var url = `${api}/category/view`;
  var tableOptions = {
    ajax: {
      url: url,
      method: "GET",
      dataSrc: function (response) {
        const { data } = response;
        return data || [];
      },
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
        data: "slug",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var btns = [
            {
              id: `btnEditCategory`,
              icon: "bx bxs-edit",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#categoryFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#categorylistdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditCategory", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case `btnEditCategory`:
        console.log(data);
        $("#categoryFormFill").changeFormFill(`${api}/category/edit/${data._id}`, "PUT");
        $("#nameCategory").val(data.name);
        break;
      default:
        break;
    }
  });

  //   $("#selectClassroomAssigned").on("change", function (event) {
  //     var classroomId = $(this).val();
  //     var classroom = Categorys.filter((group) => `${group._id}` === `${classroomId}`)[0];
  //     var { members } = classroom;
  //     table.clear();
  //     table.rows.add(members);
  //     table.draw();
  //   });
  $("#categoryFormFill").on("Submitted", function (event) {
    table.ajax.reload(null, false);
  });
}
$("#categoryFormFillModal").on("hidden.bs.modal", function () {
  $("#categoryFormFill").changeFormFill(`${api}/category/add`, "POST");
  $("#categoryFormFill")[0].reset();
});