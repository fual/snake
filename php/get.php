<?php
        $file = 'result.txt';
        $current = file_get_contents($file);

        //Получаю данные . Дальше идет парсинг файла и сортировка.
        $resultArray = explode('\n', $current);
        $newResultArray = '';

        foreach ($resultArray as $key => $row) {
            $row = explode('###',$row);
            $newResultArray[$key] = $row;
            $name[$key]  = $row[0];
            $score[$key] = $row[1];
        }
        $resultArray = $newResultArray;
        array_multisort($score, SORT_DESC, $name, SORT_ASC, $resultArray);

	      header('Content-Type: application/json');
				echo json_encode($resultArray);
?>