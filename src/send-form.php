<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправились ли наши поля name и phone и не пустые ли они
        $to = 'julia.lein@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов

        $message = '
                <html>
                    <head>
                        <title>''</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: julia.lein77@gmail.com\r\n"; //Наименование и почта отправителя
        mail($to, $message, $headers); //Отправка письма с помощью функции mail
}
?>