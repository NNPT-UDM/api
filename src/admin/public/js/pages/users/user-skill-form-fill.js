var method = "POST";
var url = $("#api").val();
var current_group = $("#classroomId").val();
var tmp;
$(document).ready(function () {
  $(".form-control").each(function () {
    $(this).attr("step", "any");
  });
});

$("#userSkillFormFillModal").on("shown.bs.modal", function (e) {
  $(document).ajaxSend(function () {
    $("#loadingOverlay").fadeIn(300);
  });
  var my_learning = $("#my_learning").val(); //same user id
  // column chart
  var options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [],
    colors: ["#f1b44c", "#5b73e8", "#34c38f"],
    yaxis: {
      min: 0,
      max: 9,

      title: {
        text: " (point)",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " point";
        },
      },
    },
  };
  var chart = new ApexCharts(document.querySelector("#skill-chart"), options);
  chart.render();
  $.ajax({
    url: `${url}/skill_point/view?owner=${my_learning}&group=${current_group}`,
    method: "GET",
    success: function (results) {
      $("#skillPointOwnerId").val(my_learning);
      $("#afterLoading").show();

      const { data } = results;
      if (data.length > 0) {
        method = "PUT";
        console.log("have data", data);
        const { stats, columns, _id } = data[0];
        tmp = data[0];
        $("#skillDocId").val(_id);
        $("#skillFormFill").hide();
        chart.updateOptions({
          xaxis: {
            categories: columns,
          },
        });
        chart.updateSeries([
          {
            name: "Mock Test",
            data: Object.values(stats.mock_test),
          },
          {
            name: "Middle",
            data: Object.values(stats.middle),
          },
          {
            name: "final",
            data: Object.values(stats.final),
          },
        ]);
        $("#skill-stats").show();
      } else {
        console.log("no data yet");
        method = "POST";
        $("#skill-stats").hide();
        $("#skillFormFill").show();
      }
    },
    error: function () {
      $("#afterLoading").hide();
    },
  }).done(function () {
    setTimeout(function () {
      $("#loadingOverlay").fadeOut(300);
      chart.resetSeries();
    }, 500);
  });
});
$("#userSkillFormFillModal").on("hidden.bs.modal", function () {
  $("#afterLoading").hide();
  $("#skillFormFill")[0].reset();
});
$("#skillFormFill").on("submit", function (e) {
  e.preventDefault();
  var formData = $(this).serializeFormJSON();
  var action = method === "POST" ? "add" : `edit/${$("#skillDocId").val()}`;
  var request = new XMLHttpRequest();
  request.open(method, `${url}/skill_point/${action}`);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(formData);
  request.onload = function () {
    if (request.status === 200) {
      toastr.clear();
      toastr.success("Success student's skill update");
      $("#userSkillFormFillModal").modal("hide");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error student's skill update");
    }
    $("#skillFormFill")[0].reset();

    //   console.log(request.responseText);
  };
});

$("#gotoEditSkill").on("click", function () {
  $("#skillFormFill").show();
  $("#skill-stats").hide();
  var { stats } = tmp;
  Object.keys(stats).map((term) => {
    Object.keys(stats[term]).map((skill) => {
      $(`input[name='stats.${term}.${skill}']`).val(stats[term][skill]);
    });
  });
});
