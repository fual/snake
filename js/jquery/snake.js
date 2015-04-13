function Snake(row, col, course) {
    //Todo: генерить хвост
    this.body = [{x: col, y: row}, {x: col, y: row - 1}, {x: col, y: row - 2}, {x: col, y: row - 3}, {x: col, y: row - 4}];
    this.course = course || 'dawn'; //Направление движения
    this.isCourseInverted = false; //Изменялось ли направление на противоположное, тогда массив переворачиваем
    var matrix = {x: 20, y: 20}; //задаю границы матрицы, и змея не будет выходить за них.

    //Метод изменения направления с клавиатуры
    this.changeCourse = function (course) {
        if ( course == 'up' ) {
            this.isCourseInverted = (this.course == 'dawn');
        }
        if ( course == 'dawn') {
            this.isCourseInverted = (this.course == 'up');
        }
        if ( course == 'right') {
            this.isCourseInverted = (this.course == 'left');
        }
        if ( course == 'left') {
            this.isCourseInverted = (this.course == 'right');
        }
        this.course = course;
    };

    //Один шаг
    this.step = function (x, y) {
        var step = {x: x, y: y};
        if (this.course == 'right') {
            step.x = (step.x == matrix.x ) ? 1 : step.x + 1;
        } else if (this.course == 'left') {
            step.x = (step.x == 1 ) ? 20 : step.x - 1;
        } else if (this.course == 'dawn') {
            step.y = (step.y == matrix.y ) ? 1 : step.y + 1;
        } else if (this.course == 'up') {
            step.y = (step.y == 1 ) ? 20 : step.y - 1;
        }
        return step;
    };

    //Движение
    this.move = function () {
        console.log(this.isCourseInverted);
        console.log(this.body[0]);

        if (this.isCourseInverted) {
            this.body.reverse();
            this.isCourseInverted = false;
        }

        var removed = this.body.pop();
        var newHead = this.step(this.body[0].x, this.body[0].y);
        this.body.unshift(newHead);
        return [removed, this.body[0]];
    }
}

