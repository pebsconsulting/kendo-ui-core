(function() {
    var Grid = kendo.ui.Grid,
        div,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }];

    module("grid static columns", {
        setup: function() {
            div = $("<div></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(div);
        }
    });

    function setup(options) {
        options = $.extend(true, {}, {
            dataSource: {
                data: data
            },
            scrollable: true,
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ]
        },
        options);

        return new Grid(div, options);
    }

    test("header is prepend with static column table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 2);
        ok(header.find("table:first").parent().hasClass("k-grid-header-static"));
    });

    test("header is not prepend with static column table if no static column is set", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 1);
        ok(!header.find(".k-grid-header-static").length);
    });

    test("th elements are added to the static header table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-static th").length, 1);
        equal(grid.element.find(".k-grid-header-static th[data-field=foo]").length, 1);

        equal(grid.element.find(".k-grid-header-wrap th").length, 2);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=bar]").length);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=baz]").length);
    });

    test("correct th elements are created when multiple static columns", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", { field: "baz", static: true }]
        });

        equal(grid.element.find(".k-grid-header-static th").length, 2);
        equal(grid.element.find(".k-grid-header-static th").eq(0).data("field"), "foo");
        equal(grid.element.find(".k-grid-header-static th").eq(1).data("field"), "baz");

        equal(grid.element.find(".k-grid-header-wrap th").length, 1);
        equal(grid.element.find(".k-grid-header-wrap th").eq(0).data("field"), "bar");
    });

    test("correct number of col elements are created", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-static col").length, 1);

        equal(grid.element.find(".k-grid-header-wrap col").length, 2);
    });

    test("correct header col elements are created when multiple static columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", static: true, width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", static: true, width: 30 }
            ]
        });

        equal(grid.element.find(".k-grid-header-static col").length, 2);
        equal(grid.element.find(".k-grid-header-static col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-header-static col")[1].style.width, "30px");

        equal(grid.element.find(".k-grid-header-wrap col").length, 1);
        equal(grid.element.find(".k-grid-header-wrap col")[0].style.width, "20px");
    });

    test("content is prepend with static column table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(grid.content.prev().hasClass("k-grid-content-static"));
    });

    test("correct number of col elements are created in the static content", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-content-static col").length, 1);

        equal(grid.element.find(".k-grid-content col").length, 2);
    });

    test("same number of rows is added to the content and the static content", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.content.find("tr").length, grid.staticContent.find("tr").length);
        equal(grid.staticContent.find("tr").length, 1);
    });

    test("width is set to static containers", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, width: 140 }, "bar", "baz"]
        });

        equal(grid.staticHeader.width(), grid.staticContent.width());
        equal(grid.staticHeader.width(), 140);
    });

    test("row height is in sync", function() {
        div.appendTo(QUnit.fixture);

        var grid = setup({
            columns: [{ template: "foo <br/> foo", static: true, width: 140, encode: false }, "bar", "baz"]
        });

        equal(grid.content.find("tr:first").height(), grid.staticContent.find("tr:first").height());
    });

    test("correct content col elements are created when multiple static columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", static: true, width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", static: true, width: 30 }
            ]
        });

        equal(grid.element.find(".k-grid-content-static col").length, 2);
        equal(grid.element.find(".k-grid-content-static col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-content-static col")[1].style.width, "30px");

        equal(grid.element.find(".k-grid-content col").length, 1);
        equal(grid.element.find(".k-grid-content col")[0].style.width, "20px");
    });

    test("correct number of col elements are created in the static footer", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });
        equal(grid.element.find(".k-grid-footer-static col").length, 1);

        equal(grid.element.find(".k-grid-footer-wrap col").length, 2);
    });

    test("correct col elements are created in the static footer when multiple static columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", static: true, footerTemplate: "foo", width: 10 },
                "bar",
                { field: "baz", static: true, footerTemplate: "baz", width: 20 }
            ]
        });

        equal(grid.element.find(".k-grid-footer-static col").length, 2);
        equal(grid.element.find(".k-grid-footer-static col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-footer-static col")[1].style.width, "20px");

        equal(grid.element.find(".k-grid-footer-wrap col").length, 1);
    });

    test("correct td elements are created in the static footer when multiple static columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", static: true, footerTemplate: "foo", width: 10 },
                { field: "bar", footerTemplate: "bar" },
                { field: "baz", static: true, footerTemplate: "baz", width: 20 }
            ]
        });

        equal(grid.element.find(".k-grid-footer-static td").length, 2);
        equal(grid.element.find(".k-grid-footer-static td").eq(0).text(), "foo");
        equal(grid.element.find(".k-grid-footer-static td").eq(1).text(), "baz");

        equal(grid.element.find(".k-grid-footer-wrap td").length, 1);
        equal(grid.element.find(".k-grid-footer-wrap td").eq(0).text(), "bar");
    });

    test("width is set to static footer", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, width: 140, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticFooter.width(), 140);
    });

    test("group cell is added to the static header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticHeader.find("col.k-group-col").length, 1);
        equal(grid.staticHeader.find("th.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(!grid.thead.parent().find("col.k-group-col").length);
        ok(!grid.thead.find("th.k-group-cell").length);
    });

    test("group cell is added to the static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.staticContent.find("col.k-group-col").length, 1);
        equal(grid.staticContent.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(!grid.content.find("col.k-group-col").length);
        ok(!grid.content.find("td.k-group-cell").length);
    });

    test("group cell is added to the static footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticFooter.find("col.k-group-col").length, 1);
        equal(grid.staticFooter.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        var nonStaticFooter = grid.footer.find(".k-grid-footer-wrap");
        ok(!nonStaticFooter.find("col.k-group-col").length);
        ok(!nonStaticFooter.find("td.k-group-cell").length);
    });

    test("collapse group with row from static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        grid.collapseGroup(grid.staticContent.find(".k-grouping-row:first"));

        equal(grid.staticContent.find(".k-grouping-row:first a.k-i-expand").length, 1);
        ok(!grid.staticContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(!grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("collapse group with row from non static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        grid.collapseGroup(grid.content.find(".k-grouping-row:first"));

        equal(grid.staticContent.find(".k-grouping-row:first a.k-i-expand").length, 1);
        ok(!grid.staticContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(!grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("expand group with row from static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var group = grid.staticContent.find(".k-grouping-row:first");
        grid.collapseGroup(group);
        grid.expandGroup(group);

        equal(grid.staticContent.find(".k-grouping-row:first a.k-i-collapse").length, 1);
        ok(grid.staticContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("expand group with row from static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var group = grid.content.find(".k-grouping-row:first");
        grid.collapseGroup(group);
        grid.expandGroup(group);

        equal(grid.staticContent.find(".k-grouping-row:first a.k-i-collapse").length, 1);
        ok(grid.staticContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("group footer is added to the static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticContent.find(".k-group-footer").length, 1);
        equal(grid.content.find(".k-group-footer").length, 1);
    });

    test("group cell is added to the group footers in the static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticContent.find("tr.k-group-footer .k-group-cell").length, 1);
    });

    test("group cell is not added to the group footers in the content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        ok(!grid.content.find("tr.k-group-footer .k-group-cell").length);
    });

    test("static columns are first in the columns collection", function() {
        var grid = setup({
            columns: ["bar", { field: "moo", static: true }, "baz", { field: "foo", static: true }]
        });

        ok(grid.columns[0].static);
        equal(grid.columns[0].field, "moo");

        ok(grid.columns[1].static);
        equal(grid.columns[1].field, "foo");

        equal(grid.columns[2].field, "bar");
        equal(grid.columns[3].field, "baz");
    });

    test("cellIndex returns correct index of static column", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var td = grid.staticContent.find("tr:first td");
        var index = grid.cellIndex(td);
        equal(index, 0);
    });

    test("cellIndex returns correct index of non static column", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var td = grid.tbody.find("tr:first td");
        var index = grid.cellIndex(td);
        equal(index, 1);
    });

    test("relatedRow returns same row when no static columns", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var row = grid.tbody.find("tr:first");
        var related = grid._relatedRow(row);

        equal(related[0], row[0]);
    });

    test("relatedRow accepts DOM element", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var row = grid.tbody.find("tr")[0];
        var related = grid._relatedRow(row);

        equal(related[0], row);
    });

    test("relatedRow returns related row in the non-static table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var row = grid.tbody.find("tr:first");
        var related = grid._relatedRow(grid.staticTable.find("tr").first());

        equal(related[0], row[0]);
    });

    test("relatedRow returns related row in the static table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var row = grid.staticTable.find("tr:first");
        var related = grid._relatedRow(grid.table.find("tr").first());

        equal(related[0], row[0]);
    });

    test("grid is resized on window resize", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var resize = stub(grid, "resize");

        $(window).trigger("resize");

        equal(resize.calls("resize"),1);
    });
})();
