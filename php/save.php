<?php
        //Сохраняю данные в файле через разделитель
        $file = 'result.json';
        $resultArray = json_decode(file_get_contents($file),true);
        $new = array();
        $new[] = $_POST['name'];
        $new[] = $_POST['result'];
        $resultArray[] = $new;
        file_put_contents($file, json_encode($resultArray));
        echo 'Result saved!';
?>