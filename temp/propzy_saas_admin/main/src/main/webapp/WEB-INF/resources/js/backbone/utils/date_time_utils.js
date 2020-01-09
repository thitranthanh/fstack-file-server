var DateTimeUtils = function() {

    var FORMAT_HH_MM_SS = "HH:mm:ss";
    var FORMAT_MMYYYY_SLASH = "MM/YYYY";
    var FORMAT_YYYY_SLASH = "YYYY";
    var FORMAT_DDMMYYYY_SLASH = "DD/MM/YYYY";
    var FORMAT_DDMMYYYY_HH_MM_SLASH = "DD/MM/YYYY HH:mm";
    var FORMAT_DDMMYYYY_HH_MM_SS_SLASH = "DD/MM/YYYY HH:mm:ss";
    var GREAT_THAN = 1;
    var EQUAL_TO = 0;
    var LESS_THAN = -1;
    var FORMAT_YYYYMMDD_SLASH = "YYYYMMDD";
    var FORMAT_YYYYMM_SLASH = "YYYYMM";
    return {
        // getters
        get_FORMAT_HH_MM_SS : function() {
            return FORMAT_HH_MM_SS;
        },
        get_FORMAT_YYYY_SLASH : function() {
            return FORMAT_YYYY_SLASH;
        },
        get_FORMAT_MMYYYY_SLASH : function() {
            return FORMAT_MMYYYY_SLASH;
        },
        get_FORMAT_DDMMYYYY_SLASH : function() {
            return FORMAT_DDMMYYYY_SLASH;
        },
        get_FORMAT_DDMMYYYY_HH_MM_SLASH : function() {
            return FORMAT_DDMMYYYY_HH_MM_SLASH;
        },
        get_FORMAT_DDMMYYYY_HH_MM_SS_SLASH : function() {
            return FORMAT_DDMMYYYY_HH_MM_SS_SLASH;
        },
        get_FORMAT_YYYYMMDD_SLASH : function() {
            return FORMAT_YYYYMMDD_SLASH;
        },
        get_FORMAT_YYYYMM_SLASH : function() {
            return FORMAT_YYYYMM_SLASH;
        },
        get_GREAT_THAN : function() {
        	return GREAT_THAN;
        },
        get_EQUAL_TO : function() {
        	return EQUAL_TO;
        },
        get_LESS_THAN : function() {
        	return LESS_THAN;
        },
        current : function() {
            return moment();
        },
        getDate : function(DD, MM, YYYY, HH, mm, ss) {
            return moment([DD,MM,YYYY,HH,mm,ss]).toDate();
        },
		getStartOfDay : function(date,format) {
			return moment(date).startOf('day').format(format);
		},
		getEndOfDay : function(date,format) {
			return moment(date).endOf('day').format(format);
		},
		getStartOfYear : function(date,format) {
			return moment(date).startOf('year').format(format);
		},
		getEndOfyear : function(date,format) {
			return moment(date).endOf('year').format(format);
		},
		getStartOfMonth : function(date,format) {
			return moment(date).startOf('month').format(format);
		},
		getEndOfMonth : function(date,format) {
			return moment(date).endOf('month').format(format);
		},
		getWeekOfYearISO  : function(date) { //beginning with Monday and ending with Sunday
            return moment(date).isoWeek();
        },
        getStartOfWeekISO : function(date, format) {
            return moment(date).startOf('isoWeek').format(format);
        },
        getEndOfWeekISO : function(date, format) {
            return moment(date).endOf('isoWeek').format(format);
        },
        getNumberOfWeeksInYear : function(date) {
            return moment(date).isoWeeksInYear();
        },
        isStrDateValid : function(strDate, format) {
            return moment(strDate,format).isValid();
        },
        stringToDate : function(strDate, format) {
			return moment(strDate,format).toDate();
        },
        toString : function(date, format) {
            return moment(date).format(format);
        },
        addDays : function(date, days) {
            return moment(date).add(days,'days');
        },
        addMonths : function(date, months) {
            return moment(date).add(months,'months');
        },
        addYears : function(date, years) {
            return moment(date).add(years,'years');
        },
        addHours : function(date, hours) {
            return moment(date).add(hours,'hours');
        },
        addMinutes : function(date, minutes) {
            return moment(date).add(minutes,'minutes');
        },
        addSeconds : function(date, seconds) {
            return moment(date).add(seconds,'seconds');
        },
        subtractDays : function(date, days) {
            return moment(date).subtract(days,'days');
        },
        subtractMonths : function(date, months) {
            return moment(date).subtract(months,'months');
        },
        subtractYears : function(date, years) {
            return moment(date).subtract(years,'years');
        },
        subtractHours : function(date, hours) {
            return moment(date).subtract(hours,'hours');
        },
        subtractMinutes : function(date, minutes) {
            return moment(date).subtract(minutes,'minutes');
        },
        subtractSeconds : function(date, seconds) {
            return moment(date).subtract(seconds,'seconds');
        },
		getDaysInMonths : function(date,format){
			return moment(date,format).daysInMonth();
		},
		distanceDaySecond : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'seconds',true));
		},
		distanceDayHour : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'hours',true));
		},
		distanceDayMinute : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'minutes',true));
		},
		distanceDayYear : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'years',true));
		},
		distanceDayMonth : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'months',true));
		},
		distanceDayDay : function(date1,date2){
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			return Math.abs(mdate1.diff(mdate2,'days',true));
		},
        compare : function(date1, date2) {
			var mdate1 = moment(date1);
			var mdate2 = moment(date2);
			var days = mdate1.diff(mdate2,'days',true);
			if(days > 0){
				return 1;
			}else if(days < 0){
				return -1;
			}else {
				return 0;
			}
        },
    };
}();