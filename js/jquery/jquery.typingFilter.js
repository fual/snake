/**
 * В плагине приложил усилися чтобы не было that = this.
 */
(function ($) {
    $.fn.typingFilter = function (options) {

        //Настройки
        var settings = $.extend({
            data: [],       // Начальный массив
            JSONurl: false, // ссылка откуда брать массив
            fieldName: '0',  // Имя поля по которому сортируют
            dataCont : '#searchNameCnt',
            createData : function(selector, data ) { //Создает список
                var items = [];
                $.each(data, function (key, val) {
                    items.push("<li>" + (key + 1) + " " + val[0] + " " + val[1] + "</li>");
                });
                dataCont.html(
                    $("<ul/>", {
                        "class": "my-new-list",
                        html: items.join("")
                    })
                );
            }
        }, options);


        var dataArray = settings.data;
        var dataCont = $(settings.dataCont);
        var makeResultsTable = settings.createData;


        //Если указана ссылка на JSON
        if (settings.JSONurl) {
            $.getJSON(settings.JSONurl, function (data) {
                dataArray = data;
            });
        }

        $(this).on('keyup', function () {
            var search = $(this).val();
            if (search) {
                //Проводим поиск
                var outPut = dataArray.filter(
                    function (val) {
                        return (!val[settings.fieldName].indexOf(search));
                    }
                );
                if (outPut.length > 0) {
                    makeResultsTable(settings.dataCont, outPut);
                } else {
                    dataCont.html('No results!');
                }

            } else {
                dataCont.html('Write symbols!');
            }
        });



    };
}(jQuery));