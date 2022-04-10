$(document).ready(function () {
  generateBrandListTable();
});

function generateBrandListTable() {
  var api = $("#api").val();
  var url = `${api}/brand/view`;
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
              id: `btnEditBrand`,
              icon: "bx bxs-edit",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#brandFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#brandlistdatatable").DataTable(tableOptions);
  table.on("click", "button#btnEditBrand", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    switch ($(this).attr("id")) {
      case `btnEditBrand`:
        console.log(data);
        $("#brandFormFill").changeFormFill(`${api}/brand/edit/${data._id}`, "PUT");
        $("#nameBrand").val(data.name);
        break;
      default:
        break;
    }
  });
  $("#brandFormFill").on("Submitted", function (event) {
    table.ajax.reload(null, false);
  });
}
$("#brandFormFillModal").on("hidden.bs.modal", function () {
  $("#brandFormFill").changeFormFill(`${api}/brand/add`, "POST");
  $("#brandFormFill")[0].reset();
});
