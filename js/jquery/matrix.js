function Matrix(container, rows, cols) {
    // строка
    this.rows = rows;

    // колонка
    this.cols = cols;

    _self = this; //используется функция foreach

    // иницилизация матрицы
    this.create = function () {
        this.$container = $(container);
        this.$container.addClass('matrix'); //Отделил css от js

        var n = this.rows * this.cols;
        for (var i = 0; i < n; i++) {
            this.$container.append($('<div/>').addClass('cell'));
        }
    };

    this.getCellObject = function (row, col) {
        cellIndex = (row - 1) * rows + col - 1;
        return this.$container.find('.cell').eq(cellIndex);
    };

    this.getCell = function (row, col, className) {
        var className = className || 'on',
            cell = this.getCellObject(row, col);
        return cell.hasClass(className);
    };


    this.setCell = function (row, col, className) {
        var className = className || 'on';
        var cell = this.getCellObject(row, col);
        cell.toggleClass(className);
    };

    this.setCells = function (cells) {
        if (typeof cells == 'object') {
            cells.forEach(function (item) {
                _self.setCell(item.y, item.x)
            });
        }
    };

    this.setFlower = function () {
        var flower = [];
        flower.x = Math.floor(Math.random() * (_self.cols - 1) + 1);
        flower.y = Math.floor(Math.random() * (_self.rows - 1) + 1);
       // console.log(flower);
        //Проверка не попадает ли на змейку. Надо сделать проверку на окрестности.
        if (!_self.getCell(flower.y, flower.x)) {
            _self.setCell(flower.y, flower.x, 'flower');
        }
        else {
            _self.setFlower();
        }
    };

}
		
