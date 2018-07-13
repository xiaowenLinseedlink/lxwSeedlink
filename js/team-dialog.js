$(document).ready(function() {
  // /var robin = $(".team-container .person.robin")[0];
  var avatar = $(".team-container .person .avatar");
  var dialogContainer = $("#blog-team-dialog .dialog-container .dialog-person")[0];
  var closeButton = $("#blog-team-dialog .dialog-container .close-button")[0];

  $(avatar).on('click', openDialog);
  $(closeButton).on('click', closeDialog);

  function openDialog(event) {
    var target = event.target;
    // forbidden layer behind backdrop from scrolling
    $("body").css('overflow-y', 'hidden');
    // add person relative info into dialog
    $(dialogContainer).append($(target).parent().html());
    // make dialog showed
    $("#blog-team-dialog").css('display', 'block');
  }

  function closeDialog() {
    $("body").css('overflow-y', 'auto');
    $(dialogContainer).empty();
    $("#blog-team-dialog").css('display', 'none');

  }
})
