<?php
        $file = 'result.json';
        $resultArray = json_decode(file_get_contents($file),true);

        //Получаю данные . Дальше идет парсинг файла и сортировка.

        $newResultArray = '';

        foreach ($resultArray as $key => $row) {
            $newResultArray[$key] = $row;
            $name[$key]  = $row[0];
            $score[$key] = $row[1];
        }
        $resultArray = $newResultArray;
        array_multisort($score, SORT_DESC, $name, SORT_ASC, $resultArray);

	    header('Content-Type: application/json');
				echo json_encode($resultArray);
?>