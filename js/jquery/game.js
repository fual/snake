function GamePlay(container) {
    this.matrix = new Matrix(container, 20, 20);
    this.snake = new Snake(5, 15, 'dawn');
    this.speed = '200'; //скорость игры;
    this.results = [];
    //Счет
    this.score = 0;
    var _self = this;
    var interval;

    /*
     Инициилизация идет в конце кода
     */

    //Запуск игры.Установка змеи на матрицы, простоновка цветов.
    this.game = function () {
        this.matrix.setCells(this.snake.body);
        this.matrix.setFlower();
        //Запускаем змею бежать
        this.run();

        $(window).keydown(function (e) {
            //Нужна задержка на следующий кейндаун.

            e = e || event;
            var key = e.keyCode,
                course = _self.snake.course,
                changeCourse = false;
            if (38 == key || 57385 == key) {
                course = 'up';
                changeCourse = true;
            } else if (40 == key || 57386 == key) {
                course = 'dawn';
                changeCourse = true;
            } else if (39 == key || 57388 == key) {
                course = 'right';
                changeCourse = true;
            } else if (37 == key || 57387 == key) {
                course = 'left';
                changeCourse = true;
            }

            if (course.length > 0 && changeCourse == true)  _self.snake.changeCourse(course);
        });
    };

    // Часть игры когда змейка двигается .
    this.run = function () {
        // console.log(this.speed);
        interval = setInterval(function () {
            var thisSnake = _self.snake.move(); //Получаем координаты будущей змеки
            //Проверяем куда змейка шагнет
            if (_self.matrix.getCell(thisSnake[1].y, thisSnake[1].x, 'on')) {//Если змейка начинает есть себя
                /*Если игра закончена*/
                clearInterval(interval);
                _self.showNameForm();
            }
            else {
                if (_self.matrix.getCell(thisSnake[1].y, thisSnake[1].x, 'flower')) { //Если следующий квадрат фрукт
                    //Добавляем в змею +1
                    _self.snake.body.push(thisSnake[0]);
                    //Снимает цветок
                    _self.matrix.setCell(thisSnake[1].y, thisSnake[1].x, 'flower');
                    //делаем новый цветок
                    _self.matrix.setFlower();
                    _self.setScore();
                } else { //Если следующий квадрат чист, то убираем закраску с последнего элемента
                    _self.matrix.setCell(thisSnake[0].y, thisSnake[0].x);
                }
                _self.matrix.setCell(thisSnake[1].y, thisSnake[1].x);//Закрашивает следующее поле
            }
        }, this.speed);

    }


    //Функция сохранения Результатов
    this.saveResults = function (name) {
        $.post("php/save.php", {
            name: name || 'alex',
            result: this.score
        }, function (data) {
            if (data != false) {
                $('.nameForm .notice').html(data);
                _self.getResults(); //Обновляем таблицу результатов
                _self.clear(); //Очищаем поле от старой игры
                setTimeout(function () {
                    _self.showNameForm()
                }, 2000)
            }
        });
    };

    //Функция обновления Результатов
    this.getResults = function () {
        $.getJSON("php/get.php", function (data) {
            if (data != false) {
                _self.setResults(data);
                _self.makeResultsTable('#results', data);
            }
        });
    };

    // Очистка поля. Новая змейка.
    this.clear = function () {
        //console.log($('.cell').length);
        $('.cell').removeClass('on flower');
        this.snake = new Snake(5, 15, 'dawn');
        $('.start').removeAttr('disabled');
    }

    //Функция показать/скрыть окощко регистрация
    this.showNameForm = function () {
        $('.nameForm, .nameForm-l').toggleClass('hide');
    };

    //Функция задания скорости.
    this.setSpeed = function (speed) {
        this.speed = speed;
    };

    //Функция увеличения счета.
    this.setScore = function () {
        this.score = this.score + (200 / this.speed);
        $('#score').html(this.score);
    };

    //
    this.makeResultsTable = function (selector, data) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<tr><td>" + (key + 1) + "</td><td>" + val[0] + "</td><td>" + val[1] + "</td></tr>" );
        });
        $(selector).html(
            $( "<table/>", {
                "class": "my-new-list",
                html: items.join( "" )
            })
        );
    };

    //setResults
    this.setResults  = function (data) {
        this.results = data;
    };

    this.matrix.create();
    this.getResults();
}



