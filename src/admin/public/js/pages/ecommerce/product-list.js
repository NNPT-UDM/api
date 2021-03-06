$(document).ready(function () {
  generateProductListTable();
});

function generateProductListTable() {
  var api = $("#api").val();
  var url = `${api}/product/view`;
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
        data: null,
        render: function (data, type, full, meta) {
          console.log(data);
          const { photo } = data;
          var photoDefault =
            '<div class="avatar-lg d-inline-block me-2">' +
            '<span class="avatar-title rounded bg-light text-body">' +
            data?.name[0].toUpperCase() +
            "</span>" +
            "</div>";
          var photoCur;
          try {
            photoCur = `/${photo.fieldname}/${photo?.filename}`;
            if (photoCur && photoCur !== "") {
              if (!isValidWebUrl(photoCur)) {
                photoCur = `${photoCur}`;
              }
              photoCur = `<img src="${photoCur}" alt="" class="avatar-lg rounded me-2" style="object-fit: contain;">`;
            } else {
              photoCur = photoDefault;
            }
          } catch (error) {
            photoCur = photoDefault;
          }
          var name = data?.name.length > 30 ? `${data?.name.slice(0, 30)}...` : data.name;

          return `<div class="d-flex justify-content-start align-items-center">
          ${photoCur} <div><p class="text-justify" >${name}</p></div>
          </div>`;
        },
      },
      {
        data: "category",
        render: function (data, type, full, meta) {
          return data.name;
        },
      },
      {
        data: "qty",
        render: function (data, type, full, meta) {
          return data;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          let { sell } = data?.price;
          return `$${sell}` || "";
        },
      },

      {
        data: null,
        render: function (data, type, full, meta) {
          var btns = [
            {
              id: `btnEditProduct`,
              icon: "bx bxs-edit",
              extra_class: "btn-primary",
              attrs: 'data-bs-toggle="modal" data-bs-target="#classworkMarkFormFillModal"',
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#productlistdatatable").DataTable(tableOptions);
  //   table.on("click", "button#btnEditProduct", function () {
  //     var tr = $(this).closest("tr");
  //     var row = table.row(tr);
  //     var data = row.data();
  //     switch ($(this).attr("id")) {
  //       case `btnEditProduct`:
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
