$(document).ready(function() {
  update()
  setInterval(update, 1000);
});

function update() {
  $.getJSON("/builds", function(data) {
    $.each(data, function(i, build) {
      var container = $("#builds");

      if ($("#"+build.ID).length == 0) {
        var buildLine = $("<div id='"+build.ID+"' class='build'></div>");
        var title = $("<h1>"+ build.Owner + "/" + build.Repo + "</h1>");
        var icon = $("<div class='icon'></div>");
        var link = $("<a href='/build_output?id="+ build.ID + "'>output</a>");
        buildLine.append(icon);
        buildLine.append(title);
        buildLine.append(link);
        container.prepend(buildLine)
      }
      var buildLine = $("#" + build.ID);
      if (build.Complete == true) {
        buildLine.removeClass("blue");
        if (build.Success == true) {
          buildLine.addClass("green");
        } else {
          buildLine.addClass("red")
        }
      } else {
        buildLine.addClass("blue")
      }
    });
  });
}