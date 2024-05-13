var weekend = [5,6];
var weekendColor = "#e0e0e0";
var fontface = "Arial";
var fontsize = 1;

var gNow = new Date();
var vSelectedDay = gNow.getDate();
var vSelectedMonth = gNow.getMonth();
var vSelectedYear = gNow.getFullYear();

var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

Calendar.Months = ["Styczeñ", "Luty", "Marzec", "Kwiecieñ", "Maj", "Czerwiec",
"Lipiec", "Sierpieñ", "Wrzesieñ", "Pa¼dziernik", "Listopad", "Grudzien"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year) {
        if ((p_month == null) && (p_year == null))        return;

        if (p_WinCal == null)
                this.gWinCal = ggWinCal;
        else
                this.gWinCal = p_WinCal;

        if (p_month == null) {
                this.gMonthName = null;
                this.gMonth = null;
                this.gYearly = true;
        } else {
                this.gMonthName = Calendar.get_month(p_month);
                this.gMonth = new Number(p_month);
                this.gYearly = false;
        }

        this.gYear = p_year;
        this.gBGColor = "white";
        this.gFGColor = "black";
        this.gTextColor = "black";
        this.gHeaderColor = "black";
        this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;

function Calendar_get_month(monthNo) {
        return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
        /*
        Check for leap year ..
        1.Years evenly divisible by four are normally leap years, except for...
        2.Years also evenly divisible by 100 are not leap years, except for...
        3.Years also evenly divisible by 400 are leap years.
        */
        if ((p_year % 4) == 0) {
                if ((p_year % 100) == 0 && (p_year % 400) != 0)
                        return Calendar.DOMonth[monthNo];

                return Calendar.lDOMonth[monthNo];
        } else
                return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
        /*
        Will return an 1-D array with 1st element being the calculated month
        and second being the calculated year
        after applying the month increment/decrement as specified by 'incr' parameter.
        'incr' will normally have 1/-1 to navigate thru the months.
        */
        var ret_arr = new Array();

        if (incr == -1) {
                // B A C K W A R D
                if (p_Month == 0) {
                        ret_arr[0] = 11;
                        ret_arr[1] = parseInt(p_Year) - 1;
                }
                else {
                        ret_arr[0] = parseInt(p_Month) - 1;
                        ret_arr[1] = parseInt(p_Year);
                }
        } else if (incr == 1) {
                // F O R W A R D
                if (p_Month == 11) {
                        ret_arr[0] = 0;
                        ret_arr[1] = parseInt(p_Year) + 1;
                }
                else {
                        ret_arr[0] = parseInt(p_Month) + 1;
                        ret_arr[1] = parseInt(p_Year);
                }
        }

        return ret_arr;
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
        /*
        Will return an 1-D array with 1st element being the calculated month
        and second being the calculated year
        after applying the month increment/decrement as specified by 'incr' parameter.
        'incr' will normally have 1/-1 to navigate thru the months.
        */
        var ret_arr = new Array();

        if (incr == -1) {
                // B A C K W A R D
                if (p_Month == 0) {
                        ret_arr[0] = 11;
                        ret_arr[1] = parseInt(p_Year) - 1;
                }
                else {
                        ret_arr[0] = parseInt(p_Month) - 1;
                        ret_arr[1] = parseInt(p_Year);
                }
        } else if (incr == 1) {
                // F O R W A R D
                if (p_Month == 11) {
                        ret_arr[0] = 0;
                        ret_arr[1] = parseInt(p_Year) + 1;
                }
                else {
                        ret_arr[0] = parseInt(p_Month) + 1;
                        ret_arr[1] = parseInt(p_Year);
                }
        }

        return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
        var vCode = "";
        var vHeader_Code = "";
        var vData_Code = "";

        // Begin Table Drawing code here..
        vCode = vCode + "<TABLE BORDER=0 BGCOLOR=\"" + this.gBGColor + "\">";

        vHeader_Code = this.cal_header();
        vData_Code = this.cal_data();
        vCode = vCode + vHeader_Code + vData_Code;

        vCode = vCode + "</TABLE>";

        return vCode;
}

Calendar.prototype.show = function() {
        var vCode = "";

        this.gWinCal.document.open();

        // Setup the page...
        this.wwrite("<html>");
        this.wwrite("<head><title>Kalendarz</title>");
         this.wwrite("<style type='text/css'>");
    this.wwrite("a:link { text-decoration : none; }");
    this.wwrite("a:visited { text-decoration : none; }");
    this.wwrite("a:active  { text-decoration : none; }");
    this.wwrite("select { font-size : 10px; font-family : verdana, arial, helvetica, sans-serif; }");
    this.wwrite("</style>");
        this.wwrite("</head>");

        this.wwrite("<body " +
                "link=\"" + this.gLinkColor + "\" " +
                "vlink=\"" + this.gLinkColor + "\" " +
                "alink=\"" + this.gLinkColor + "\" " +
                "text=\"" + this.gTextColor + "\">");
        this.wwriteA("<center>");
        this.wwriteA("<FONT FACE='" + fontface + "' SIZE=1><B>");
        this.wwriteA(this.gMonthName + " " + this.gYear);
        this.wwriteA("</B>");

        // Show navigation buttons
        var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
        var prevMM = prevMMYYYY[0];
        var prevYYYY = prevMMYYYY[1];

        var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
        var nextMM = nextMMYYYY[0];
        var nextYYYY = nextMMYYYY[1];

        this.wwrite("<TABLE width='100%' BORDER=0 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#98b627'><TR><TD width='50%' ALIGN=center>");
        this.wwrite("<A HREF=\"" +
                "javascript:window.opener.Build(" +
                "'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
                ");" +
                "\"><font face='Arial' size=1 color='#ffffff'>&lt;&lt;&lt;</font><\/A></TD><TD width='50%' ALIGN=center>");
        this.wwrite("<A HREF=\"" +
                "javascript:window.opener.Build(" +
                "'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
                ");" +
                "\"><font face='Arial' size=1 color='#ffffff'>&gt;&gt;&gt;</font><\/A></TD>");

        this.wwrite("</TR></TABLE>");

        // Get the complete calendar code for the month..
        vCode = this.getMonthlyCalendarCode();
        this.wwrite(vCode);

       
        this.wwrite("</font></center></body></html>");
        this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) {
        this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
        this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
        var vCode = "";

        vCode = vCode + "<TR>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Pn</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Wt</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>¦r</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Cz</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Pt</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='14%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Sb</B></FONT></TD>";
        vCode = vCode + "<TD WIDTH='16%'><FONT SIZE='1' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Nd</B></FONT></TD>";
        vCode = vCode + "</TR>";

        return vCode;
}

Calendar.prototype.cal_data = function() {
        var vDate = new Date();
        vDate.setDate(1);
        vDate.setMonth(this.gMonth);
        vDate.setFullYear(this.gYear);

        var vFirstDay=vDate.getDay() - 1;
        if (vFirstDay < 0)
                vFirstDay = 6;
        var vDay=1;
        var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
        var vOnLastDay=0;
        var vCode = "";

        /*
        Get day for the 1st of the requested month/year..
        Place as many blank cells before the 1st day of the month as necessary.
        */

        vCode = vCode + "<TR>";
        for (i=0; i<vFirstDay; i++) {
                vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(i) + "><FONT SIZE='1' FACE='" + fontface + "'> </FONT></TD>";
        }

        // Write rest of the 1st week
        for (j=vFirstDay; j<7; j++) {
                vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='1' FACE='" + fontface + "'>" +
                        "<A HREF='#' " +
                                "onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
                                this.format_data(vDay) +
                                "';window.close();\">" +
                                this.format_day(vDay) +
                        "</A>" +
                        "</FONT></TD>";
                vDay=vDay + 1;
        }
        vCode = vCode + "</TR>";

        // Write the rest of the weeks
        for (k=2; k<7; k++) {
                vCode = vCode + "<TR>";

                for (j=0; j<7; j++) {
                        vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='1' FACE='" + fontface + "'>" +
                                "<A HREF='#' " +
                                        "onClick=\"self.opener.document." + this.gReturnItem + ".value='" +
                                        this.format_data(vDay) +
                                        "';window.close();\">" +
                                this.format_day(vDay) +
                                "</A>" +
                                "</FONT></TD>";
                        vDay=vDay + 1;

                        if (vDay > vLastDay) {
                                vOnLastDay = 1;
                                break;
                        }
                }

                if (j == 6)
                        vCode = vCode + "</TR>";
                if (vOnLastDay == 1)
                        break;
        }

        // Fill up the rest of last week with proper blanks, so that we get proper square blocks
        for (m=1; m<(7-j); m++) {
                if (this.gYearly)
                        vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
                        "><FONT SIZE='1' FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
                else
                        vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) +
                        "><FONT SIZE='1' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
        }

        return vCode;
}

Calendar.prototype.format_day = function(vday) {
        if (vday == vSelectedDay && this.gMonth == vSelectedMonth && this.gYear == vSelectedYear)
                return ("<FONT COLOR=\"RED\"><B>" + vday + "</B></FONT>");
        else
                return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
        var i;

        // Return special formatting for the weekend day.
        for (i=0; i<weekend.length; i++) {
                if (vday == weekend[i])
                        return (" BGCOLOR=\"" + weekendColor + "\"");
        }

        return "";
}

Calendar.prototype.format_data = function(p_day) {
        var vData;
        var vMonth = 1 + this.gMonth;
        vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
        var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
        var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
        var vY4 = new String(this.gYear);
        var vY2 = new String(this.gYear.substr(2,2));
        var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

        vData = vDD + "\/" + vMonth + "\/" + vY4;

        return vData;
}

function Build(p_item, p_month, p_year) {
        var p_WinCal = ggWinCal;
        gCal = new Calendar(p_item, p_WinCal, p_month, p_year);

        // Customize your Calendar here..
        gCal.gBGColor="#f1f1f1";
        gCal.gLinkColor="black";
        gCal.gTextColor="#a22f20";
        gCal.gHeaderColor="black";

        gCal.show();
}

function show_calendar(name_field, initial_field) {
        /*
                p_item        : Return Item.
                p_month : 0-11 for Jan-Dec; 12 for All Months.
                p_year        : 4-digit year
        */

        p_item = name_field;

        if (initial_field == null)
                initial_field = eval("document." + name_field + ".value");
        var select_day = initial_field != null ? initial_field.substring(0,2) : -1;
        var select_month = initial_field != null ? (initial_field.substring(3,5)) - 1 : -1;
        var select_year = initial_field != null ? initial_field.substring(6) : -1;

        if (select_month != null && select_month >= 0 && select_month < 12)
                p_month = select_month;
        else {
                p_month = new String(gNow.getMonth());
                vSelectedMonth = gNow.getMonth();
        }

        if (select_year != null && select_year >= 1900 && select_year < 2100)
                p_year = select_year;
        else {
                p_year = new String(gNow.getFullYear().toString());
                vSelectedYear = gNow.getFullYear();
        }

        if (select_day != null && select_day > 0 && select_day <= 31)
                vSelectedDay = select_day;
        else
                vSelectedDay = gNow.getDate();

        vWinCal = window.open("", "Kalendarz",
                "width=140,height=150,status=no,resizable=no,top=300,left=500,");
        vWinCal.opener = self;
        ggWinCal = vWinCal;

        Build(p_item, p_month, p_year);
}


function textCounter(field, maxlimit) {
        if (field.value.length > maxlimit) // if too long...trim it!
                field.value = field.value.substring(0, maxlimit);
}

function initDates() {
        var now = new Date();
        var vDay = gNow.getDate();
        var vMonth = gNow.getMonth() + 1;
        var vYear = gNow.getFullYear();
        var vDD = (vDay.toString().length < 2) ? "0" + vDay : vDay;
        var vMM = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
        var vY4 = new String(vYear);
        var vData = vDD + "\/" + vMM + "\/" + vY4;
        window.document.insert.to_date.value = vData;
        window.document.insert.from_date.value = vData;
}