$(document).ready(function () {

        function tablesorter() {
            if (startval == '') {
                startval = tempstartval;
            }
            else if (startval == 'next') {
                startval = parseInt(tempstartval) + parseInt(20);
                tempstartval = startval;
            }
            else if (startval == 'prev') {
                startt = parseInt(tempstartval) - parseInt(20);
                if (startt >= 20) {
                    startval = startt;
                }
                else {
                    startval = 0;
                }
                tempstartval = startval;
            }

            else {
                tempstartval = startval;
            }
            if (type == '') {
                type = temptyp;
                clmnam = tempclmnam;
            }
            else {
                temptyp = type;
                tempclmnam = clmnam;
            }
        }

        function setPageSize(table, size) {
            var c = table.config;
            c.size = size;
            c.totalPages = Math.ceil(c.totalRows / c.size);
            c.pagerPositionSet = false;
            moveToPage(table);
            fixPosition(table);
        }

        function fixPosition(table) {
            var c = table.config;
            if (!c.pagerPositionSet && c.positionFixed) {
                var c = table.config, o = $(table);
                if (o.offset) {
                    c.container.css({
                        top: o.offset().top + o.height() + 'px',
                        position: 'absolute'
                    });
                }
                c.pagerPositionSet = true;
            }
        }

        function moveToFirstPage(table) {
            var c = table.config;
            c.page = 0;
            moveToPage(table);
        }

        function moveToLastPage(table) {
            var c = table.config;
            c.page = (c.totalPages - 1);
            moveToPage(table);
        }

        function moveToNextPage(table) {
            var c = table.config;
            c.page++;
            if (c.page >= (c.totalPages - 1)) {
                c.page = (c.totalPages - 1);
            }
            moveToPage(table);
        }

        function moveToPrevPage(table) {
            var c = table.config;
            c.page--;
            if (c.page <= 0) {
                c.page = 0;
            }
            moveToPage(table);
        }


        function moveToPage(table) {
            var c = table.config;
            if (c.page < 0 || c.page > (c.totalPages - 1)) {
                c.page = 0;
            }

        }

        $("#myTable").tablesorter();
    }
);