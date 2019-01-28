import $ from "jquery";

function parseRGBA(rgbaString) {
    const rgba = rgbaString.substring(rgbaString.indexOf("(") + 1, rgbaString.lastIndexOf(")")).split(/,\s*/);
    let c: any = {};
    c.r = eval(rgba[0]);
    c.g = eval(rgba[1]);
    c.b = eval(rgba[2]);
    c.a = eval(rgba[3]);

    if (c.a == undefined) c.a = 1;
    return c;
}

function pageToPdfInstructions(page) {
    var textTags = "a,b,i,p,span";
    var nonTextTags = `:not(${textTags})`;

    var jsPDF_Instructions = "doc.setLineWidth(0.001);\n";

    var pageWidth = 11; // inches
    var pageHeight = 8.5; // inches

    var lastFontSize;
    var lastFontStyle;
    var lastFillColor;
    var lastFillAlpha = 0;

    var textElements = page.find(textTags);
    var nonTextElements = page.find(nonTextTags);

    function pxToInches(px) {
        // (px / page width in pixels) * page width in inches
        return (px / page.outerWidth()) * pageWidth;
    }

    function pxToPoint(px) {
        // pxToInches(px) * 72 // 1 inch = 72pt
        return pxToInches(px) * 72;
    }

    // Loop throught all of the non text elements
    $.each(nonTextElements, function(i, o) {
        var imageHeight = pxToInches($("#arrowImage").height());
        var imageWidth = pxToInches($("#arrowImage").width());
        var offset = $(o).offset();
        var style = window.getComputedStyle(o, null);

        var fillColor = style.backgroundColor;

        let top: number = pxToInches(offset.top);
        var bottom: number = pxToInches(offset.top + $(o).outerHeight());
        var left: number = pxToInches(offset.left);
        var right: number = pxToInches(offset.left + $(o).outerWidth());
        var width = (right - left).toFixed(7);
        var height = (bottom - top).toFixed(7);

        top = +top.toFixed(7);
        bottom = +bottom.toFixed(7);
        left = +left.toFixed(7);
        right = +right.toFixed(7);

        var c = parseRGBA(fillColor);
        //lastFillAlpha = c.a;
        if (fillColor != lastFillColor && c.a > 0) {
            //debugger;
            jsPDF_Instructions += "doc.setFillColor(" + c.r + ", " + c.g + ", " + c.b + ");\n";
            lastFillColor = fillColor;
        }

        var rectWithBorder = false;
        var rectStyle = "";
        if (c.a > 0) rectStyle += "F";
        if (
            style.borderLeft == style.borderTop &&
            style.borderLeft == style.borderRight &&
            style.borderTop == style.borderBottom &&
            style.borderTopStyle == "solid"
        ) {
            rectWithBorder = true;
            rectStyle += "D";
        }

        if (rectStyle)
            jsPDF_Instructions +=
                "doc.rect(" + left + ", " + top + ", " + width + ", " + height + ", '" + rectStyle + "');\n";

        if (!rectWithBorder) {
            if (style.borderTopStyle == "solid")
                jsPDF_Instructions += "doc.line(" + left + ", " + top + ", " + right + ", " + top + ");\n";
            if (style.borderBottomStyle == "solid")
                jsPDF_Instructions += "doc.line(" + left + ", " + bottom + ", " + right + ", " + bottom + ");\n";
            if (style.borderLeftStyle == "solid")
                jsPDF_Instructions += "doc.line(" + left + ", " + top + ", " + left + ", " + bottom + ");\n";
            if (style.borderRightStyle == "solid")
                jsPDF_Instructions += "doc.line(" + right + ", " + top + ", " + right + ", " + bottom + ");\n";
        }

        if ($(o).hasClass("arrow")) {
            jsPDF_Instructions +=
                "doc.addImage(imageData , 'JPEG', " +
                (right - imageWidth - 0.01).toFixed(7) +
                ", " +
                (bottom - imageHeight - 0.01).toFixed(7) +
                ", " +
                imageWidth.toFixed(7) +
                ", " +
                imageHeight.toFixed(7) +
                ");\n";
        }
    });

    // Loop throught all of the text elements
    $.each(textElements, function(i, o) {
        var text = JSON.stringify($(o).text());

        if (text == '""') return;

        var style = window.getComputedStyle(o, null);
        var fontSize = pxToPoint(eval(style.fontSize.replace("px", "")));
        var fontStyle = style.fontStyle;

        var offset = $(o).offset();
        var top = pxToInches(offset.top);
        var bottom = pxToInches(offset.top + $(o).outerHeight());
        var lineBottom = pxToInches(offset.top + fontSize);
        var left = pxToInches(offset.left);
        var right = pxToInches(offset.left + $(o).outerWidth());

        if (fontSize != lastFontSize) {
            jsPDF_Instructions += "doc.setFontSize(" + fontSize.toFixed(7) + ");\n";
            lastFontSize = fontSize;
        }

        if (fontStyle != lastFontStyle) {
            jsPDF_Instructions += 'doc.setFontType("' + fontStyle + '");\n';
            lastFontStyle = fontStyle;
        }

        jsPDF_Instructions += "doc.text(" + left.toFixed(7) + ", " + bottom.toFixed(7) + ", " + text + ");\n";
        //debugger;
    });

    page.hide();

    // return
    return jsPDF_Instructions;
}

export function genPdfInstructions() {
    var pages = $("div.rpt-page");

    var jsPDF_Instructions = `
var doc = new jsPDF({
    orientation: 'l',
    unit: 'in',
    format: 'letter',
    hotfixes: [] // an array of hotfix strings to enable
})
`;
    // jsPDF_Instructions += "var imageData = '" + $("#arrowImage")[0].src + "';\n";

    $.each(pages, function(i, o) {
        // if the page index is on the second or following pages...
        if (i > 0) {
            jsPDF_Instructions += "doc.addPage();\n";
        }
        jsPDF_Instructions += pageToPdfInstructions($(o));
    });

    pages.show();

    return jsPDF_Instructions;
}

window["genPdfInstructions"] = genPdfInstructions;
