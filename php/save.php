<?php
        //Сохраняю данные в файле через разделитель
        $file = 'result.txt';
        $current = file_get_contents($file);
        $current = $_POST['name']."###".$_POST['result'] .'\n' . $current ;
        file_put_contents($file, $current);
        echo 'Result saved!';
?>