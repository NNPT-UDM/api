var api = $("#api").val();
var webbase = $("#websitebase").val();
var classroomId = $("#classroomId").val();
var lesson = JSON.parse($("#lessonDetail").val());
var userReviewed = lesson.reviews;
console.log(userReviewed);
function ajaxInit(cb) {
  var url = `${api}/group/view?_id=${classroomId}`;
  $.ajax({
    url: url,
    method: "GET",
  }).done(function (response) {
    cb(response.data);
  });
}

$(document).ready(
  ajaxInit(function (response) {
    var { name, members, lessons, classworks, qty } = response;
    $("#classroomName").text("Class: " + name);
    $("#qtyMems").val(qty);
    generateStudentTable(members, lessons);
  })
);
function generateStudentTable(members = [], lessons = []) {
  var tableOptions = {
    data: members,
    retrieve: true,
    columns: [
      {
        data: null,
        render: function (data, type, full, meta) {
          return "<strong>" + (meta.row + 1) + "</strong>";
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var avtDefault =
            '<div class="avatar-xs d-inline-block me-2">' +
            '<span class="avatar-title rounded-circle bg-light text-body">' +
            data.display_name[0].toUpperCase() +
            "</span>" +
            "</div>";
          var avt;
          try {
            avt = data.photo;
            if (avt && avt !== "") {
              avt = `<img src="images/users/${avt}" alt="" class="avatar-xs rounded-circle me-2">`;
            } else {
              avt = avtDefault;
            }
          } catch (error) {
            avt = avtDefault;
          }

          return `${avt} <a href="#" class="text-body">${data.display_name}</a>`;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          let reviewDefault = `<span class="badge bg-warning ">no review</span>`;
           
          let reviewUser = userReviewed.filter((x) => x.owner._id === data._id);
          if(reviewUser.length) reviewDefault = reviewUser[0].recommend.length;
          return reviewDefault;
        },
      },
      {
        data: null,
        render: function (data, type, full, meta) {
          var { _id, activated } = data;
          var disabledClass = Boolean(activated) ? "" : "\tdisabled";
          var btns = [
            {
              id: "btnAddReview",
              icon: "bx bxs-comment-add",
              extra_class: "btn-primary",
              disable: disabledClass,
              attrs: 'data-bs-toggle="modal" data-bs-target="#reviewFormFillModal"',
            },
            {
              id: "",
              icon: "uil uil-external-link-alt",
              extra_class: "btn-light",
              disable: disabledClass,
              href: `${webbase}/contacts-profile/${_id}`,
            },
          ];
          return generateBtnActions(btns);
        },
      },
    ],
  };
  var table = $("#lessondatatable").DataTable(tableOptions);
  table.on("click", "button#btnUserSkillFormFill, button#btnAddReview, button#btnEditNote", function () {
    var tr = $(this).closest("tr");
    var data = table.row(tr).data();
    switch ($(this).attr("id")) {
      case "btnUserSkillFormFill":
        $("#my_learning").val(data._id);
        console.log($("#my_learning").val());
        break;
      case "btnAddReview":
        $("#reviewOwnerId").val(data._id);
        break;
      case "btnEditNote":
        $("#noteGroupId").val(classroomId);
        $("#noteOwnerId").val(data._id);
        break;
      default:
        break;
    }
  });
  var opts = $("#lessonIdRef").children("option");
  if (opts.length < 2) {
    Array.from(lessons).forEach((lesson) => {
      var option = new Option(lesson.title, lesson._id);
      $(option).html(lesson.title);
      $("#lessonIdRef").append(option);
    });
  }
}

$("#reviewFormFillModal").on("shown.bs.modal", function () {
  $("#lessonIdRef").val(lesson.id);
  $("#lessonIdRef").trigger("change");
});

