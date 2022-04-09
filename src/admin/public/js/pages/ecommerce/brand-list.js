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
        data: null,
        render: function (data, type, full, meta) {
          var btns = [
            {
              id: `btnEditAnswer`,
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
