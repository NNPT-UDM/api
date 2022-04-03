$("#assignedClassroomModal").on("shown.bs.modal", function () {
  var api = $("#api").val();
  var webbase = $("#websitebase").val();
  var userId = $("#teacherId").val();
  var tableOptions = {
    ajax: {
      url: `${api}/group/view?host=${userId}`,
      method: "GET",
      dataSrc: function (response) {
        var { data } = response;
        return data;
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
        data: "name",
        render: function (data, type, full, meta) {
          return data;
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
          var btn = Boolean(activated)
            ? { color: "btn-success", action: `${api}/group/disable/${data._id}` }
            : { color: "btn-warning", action: `${api}/group/activate/${data._id}` };
          var { _id } = data;
          var btns = [
            {
              id: `btnApprove${data._id}`,
              icon: "uil uil-check",
              extra_class: `${btn.color} make-request`,
              attrs: `method="put" action="${btn.action}"`,
            },
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              href: `${webbase}/classroom/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };

  // init datatable
  var table = $("#assignedclassdatatable").DataTable(tableOptions);
  table.on("click", "button.make-request", function (event) {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var data = row.data();
    // console.log(data, $(this).attr("id"));
    switch ($(this).attr("id")) {
      case `btnApprove${data._id}`:
        $(`#btnApprove${data._id}`).on("Requested", function (event) {
          table.ajax.reload(null, false);
        });
        break;
      default:
        break;
    }
  });
});

$("#assignedClassroomModal").on("hidden.bs.modal", function () {
  $("#assignedclassdatatable").DataTable().clear().destroy();
});
