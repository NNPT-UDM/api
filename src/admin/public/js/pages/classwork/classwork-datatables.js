function isValidWebUrl(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}
$(document).ready(function () {
  var url = `${$("#user-view").val()}`;
  var classroomId = `${$("#classroomId").val()}`;
  var webbase = $("#websitebase").val();
  let arrAttachment = [];
  var tableOptions = {
    ajax: {
      url: `${url}&per_page=1000000`,
      method: "get",
      dataSrc: function (json) {
        console.log(json.data);
        $("#classroomName").text("Class: " + json.data.name);
        $("#qtyClass").val(json.data.qty);
        return json.data.classworks;
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
        data: "title",
        render: function (data, type, full, meta) {
          return data;
        },
      },

      {
        data: "deadline",
        render: function (data, type, full, meta) {
          return new Date(data).toLocaleString("vi-VN");
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<h6>" + data.count_answers + "/" + $("#qtyClass").val() + "</h6>";
        },
        class: "text-center",
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return (
            '<ul class="list-inline mb-0">' +
            '<li class="list-inline-item">' +
            '<a  href="' +
            webbase +
            "/classwork/" +
            data._id +
            "/" +
            classroomId +
            '" class="px-2 py-1 btnEditUserProfile\t' +
            '\tbtn btn-info btn-rounded waves-effect waves-light" >' +
            '<i class="uil uil-eye font-size-12">' +
            "</i></a></li>" +
            '<li class="list-inline-item">' +
            '<button id="btnEditClasswork" type="button" class="px-2 py-1 \t' +
            '\tbtn btn-primary btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#editClassworkModalScrollable">' +
            '<i class="uil uil-pen font-size-12">' +
            "</i></button></li>" +
            "</ul>"
          );
        },
      },
    ],
  };
  // tinymce.init({
  //   selector: "textarea#edit-description-input",
  //   plugins: "link",
  //   default_link_target: "_blank",
  // });
  var table = $("#classworkdatatable").DataTable(tableOptions);
  table.on("click", ".btn-edit-classwork-row", function () {
    $("#classwork-edit-profile")[0].reset();
    var tr = $(this).closest("tr");
    var data = table.row(tr).data();
    console.log(data);
    $("#show-attachment").html("");
    if (!!data.attachments.length) {
      arrAttachment = [];
      var htmlAttachment = "";
      for (let attachment of data.attachments) {
        if (!!attachment) {
          arrAttachment.push(attachment._id);
          htmlAttachment += ` <div class="d-flex flex-row">
          <a class="" href="/docs/${attachment.filename}" download
            >${attachment.filename}</a
          >
          <button type="button" class="btn p-0 btn-sm delete-attachment" action="${data._id}" data-attachment="${attachment._id}">
            <i class="bx bx-x text-danger font-size-24"></i>
          </button>
        </div>`;
        }
      }

      $("#show-attachment").html(htmlAttachment);
    }
    $("#edit-title-input").val(data.title);
    $("#edit-deadline-input").val(getFormattedDate(data.deadline));
    tinymce.get("edit-description-input").setContent(data.description);
    console.log(data.description);
    $("#classwork-edit-profile").attr("action", data._id);
    $(".delete-attachment").on("click", function (e) {
      e.preventDefault();
      let nodeParent = $(this).parent(".flex-row");
      let url = $("#api").val();
      let action = $(this).attr("action");
      let idAttachment = [$(this).attr("data-attachment")];
      let json = {
        pull: {
          attachments: {
            in: idAttachment,
          },
        },
      };
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then(function (result) {
        if (result.value) {
          $.ajax({
            method: "PUT",
            url: `${url}/classwork/edit/${action}`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(json),
            success: function (data) {
              // toastr.success("Success delete");
              $("#classworkdatatable").DataTable().ajax.reload(null, false);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              nodeParent.addClass("d-none");
            },
            error: function (request, status, error) {
              toastr.clear();
              Swal.fire("Oops...", "Something went wrong!", "error");
            },
          });
        }
      });
    });
  });
});

$("#add-new-classwork").on("click", function () {
  $("#classworkFormFill")[0].reset();
});
