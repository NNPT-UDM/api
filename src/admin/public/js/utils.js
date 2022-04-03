(function ($) {
  $.fn.serializeFormJSON = function () {
    var serialize = this.serializeArray();
    return JSON.stringify(parseJsonFromForm(serialize));
  };

  $.fn.changeFormFill = function (action, method) {
    this.attr("action", action).attr("method", method);
  };
})(jQuery);

function generateBtnActions(btns) {
  var liArray = Array.from(btns).map((btn) => {
    var btnAction = "";
    if (btn.href) {
      btnAction = `<a role="button" href="${btn.href}" class="px-2 py-1 btn ${btn.extra_class} btn-rounded waves-effect">
      <i class="${btn.icon} font-size-12"></i></a>`;
    } else {
      btnAction = `<button id="${btn.id}" type="button" class="px-2 py-1 btn ${
        btn.extra_class
      } btn-rounded waves-effect waves-light ${btn.disable || ""}" ${btn.attrs}>
    <i class="${btn.icon} font-size-12"></i>
    </button>`;
    }
    return `
    <li class="list-inline-item">
    ${btnAction}
    </li>`;
  });
  return `<ul class="list-inline mb-0">${liArray.join("")}</ul>`;
}
function isValidWebUrl(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
