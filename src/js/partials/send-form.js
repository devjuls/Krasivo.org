$(document).ready(function(){
  $(".contact-info__form").submit(function() { //устанавливаем событие отправки для формы

    // var id = $(this).attr('id');
    var name = $(this).find('.input--name').val();
    var phone = $(this).find('.input--phone').val();
    alert("работает!");

    $.ajax({
      type: "POST", //Метод отправки
      url: "../../send-form.php", //путь до php файла отправителя
      data: {name: name, phone: phone},
      success: function() {
             //код в этом блоке выполняется при успешной отправке сообщения
             alert("Ваше сообщение отправлено!");
      }
    });
  });
});