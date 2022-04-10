$(document).ready(function () {
  generateOrderListTable();
});

function generateOrderListTable() {
  var api = $("#api").val();
  var url = `${api}/order/view`;
  var tableOptions = {
    ajax: {
      url: url,
      method: "GET",
      dataSrc: function (response) {
        const { data } = response;
        console.log(data)
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
        data: null,
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
        data: "create_at",
        render: function (data, type, full, meta) {
          return new Date(data).toLocaleString("vi-VN");
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          return "";
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          `<div><span class="badge "bg-warning" ">Pending</span></div>`;
        },
      },

      {
        data: null,
        render: function (data, type, full, meta) {
          var btns = [
            {
              id: `btnEditAnswer`,
              icon: "bx bxs-edit",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#orderFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#orderlistdatatable").DataTable(tableOptions);
  //   table.on("click", "button#btnEditAnswer", function () {
  //     var tr = $(this).closest("tr");
  //     var row = table.row(tr);
  //     var data = row.data();
  //     switch ($(this).attr("id")) {
  //       case `btnEditAnswer`:
  //         console.log(data);
  //         let dataMark = data.corrections;
  //         if (!!dataMark) {
  //           $("#classworkMarkFormFill").changeFormFill(`${api}/classwork_mark/edit/${dataMark._id}`, "PUT");
  //           $("#classworkAnswerId").val(data._id);
  //           $("#classworkAnswerScore").val(dataMark.score);
  //           $("#classworkAnswerRubric").val(dataMark.rubric);
  //           if (!!data.attachments.length) {
  //             console.log(data.attachments);
  //             const attachmentAnswer = renderAttachmentAnswer(data.attachments);
  //             $("#classworkAnswerAttachmentShow").html(attachmentAnswer);
  //           }
  //           const attachmentMark = renderAttachmentMark(dataMark.attachments, dataMark._id);
  //           $("#classworkMarkAttachmentShow").html(attachmentMark);
  //           deleteAttachmentMark();
  //         } else {
  //           $("#classworkAnswerId").val(data._id);
  //           $("#classworkMarkFormFill").changeFormFill(`${api}/classwork_mark/add/`, "POST");
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   $("#selectClassroomAssigned").on("change", function (event) {
  //     var classroomId = $(this).val();
  //     var classroom = answers.filter((group) => `${group._id}` === `${classroomId}`)[0];
  //     var { members } = classroom;
  //     table.clear();
  //     table.rows.add(members);
  //     table.draw();
  //   });
  //   $("#classworkMarkFormFill").on("Submitted", function (event) {
  //     ajaxInit(function (response) {
  //       var { answers } = response;
  //       var classroomSelected = $("#selectClassroomAssigned").val();
  //       var classroom = answers.filter((group) => `${group._id}` === `${classroomSelected}`)[0];
  //       var { members } = classroom;
  //       table.clear();
  //       table.rows.add(members);
  //       table.draw();
  //     });
  //   });
}
