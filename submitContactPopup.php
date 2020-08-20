<meta charset="utf-8">
<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    // apache_setenv('no-gzip', 1);
    // ini_set('zlib.output_compression', 0);

    $response = "";
    $responseFlag = 0;

    if (isset($_POST['action']) && !(empty($_POST['action'])) && !(empty($_POST['contactName']))
        && !(empty($_POST['contactTel'])) && !(empty($_POST['contactEmail']))
        && !(empty($_POST['contactMessage']))) {

        $from = $_POST['contactEmail'];
        $tel = $_POST['contactTel'];
        $name = $_POST['contactName'];
        $message = $_POST['contactMessage'];

        $subject = "Contact popup from yevdokimov.pro";
        $body = "Сообщение из контактной формы от "
            . $name
            . " | "
            . $tel
            . " | "
            . $from
            . "\n\n-------------------\n\n"
            . $message;
        


        $responseFlag = 1;
        
        sendEmail($subject, $body);
                        

        if (!$responseFlag) {
            header('X-Accel-Buffering: no');
            echo $response;

            //Begin code from link
            ob_end_clean();
            header("Connection: close");
            ignore_user_abort(true);
            ob_start();
            echo $response;
            // header("Content-Length: " . mb_strlen($response));
            ob_end_flush();
            flush();
            //End code from link
        }
    }

    $response = "Пожалуйста, заполните все поля.";

    if (!$responseFlag) {
        header('X-Accel-Buffering: no');
        echo $response;

        //Begin code from link
        ob_end_clean();
        header("Connection: close");
        ignore_user_abort(true);
        ob_start();
        echo $response;
        // header("Content-Length: " . mb_strlen($response));
        ob_end_flush();
        flush();
        //End code from link
    }


    function sendEmail($subject, $body) {
        $mail = new PHPMailer();  
        
        // $mail->Encoding = "utf-8";
        $mail->Host = "smtp.beget.com";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "mail@yevdokimov.pro";
        $mail->Password = "Zaq12wsX";
        $mail->SMTPSecure = "ssl";
        $mail->Port = 465;

        // $mail->addAddress("theshadow212@gmail.com");
        $mail->addAddress("yevdokimov.pro@gmail.com");
        $mail->setFrom("mail@yevdokimov.pro", "yevdokimov.pro");
        $mail->Subject = $subject;
        $mail->isHTML(false);
        $mail->Body = $body;

        if(!$mail->send()) {
            error_log('Message could not be sent.');
            error_log('Error code: ' . $mail->ErrorInfo);
            error_log("Subject: " . $subject);
            error_log("Body: " . $body);

            $response = "Произошла ошибка. Пожалуйста, попробуйте ещё раз.";
            echo $response;
        } else {
            $response = "Ваше сообщение отправлено.";
            echo $response;
        }
    }
?>
