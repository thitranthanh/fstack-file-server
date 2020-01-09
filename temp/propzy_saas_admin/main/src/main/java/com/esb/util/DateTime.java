package com.esb.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.apache.log4j.Logger;

public class DateTime {

    private static Logger log = Logger.getLogger(DateTime.class);

    public static String TIME_ZONE_DEFAULT = String.valueOf(Calendar.getInstance().getTimeZone().getID());

    private DateTime() {
        TimeZone.setDefault(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
    }

    private static class Loader {
        private static final DateTime INSTANCE = new DateTime();
    }

    public static DateTime getInstance() {
        return Loader.INSTANCE;
    }

    // start
    public Date convertStringToDate(String date, String inFormatDate, String timezone) {
        Date ret = null;
        try {
            SimpleDateFormat df = new SimpleDateFormat(inFormatDate);
            df.setTimeZone(TimeZone.getTimeZone(timezone));
            ret = df.parse(date);
        } catch (Exception ex) {
            Util.convertExceptionToString(ex);
        }
        return ret;
    }

    public String getDateTime(Date date, String format, String timeZone) {
        String ret = null;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
            simpleDateFormat.setTimeZone(TimeZone.getTimeZone(timeZone));
            ret = simpleDateFormat.format(date);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    // testGetDateTime01
    public String getDateTime(String format, String timezone) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(timezone));
        return simpleDateFormat.format(new Date());
    }

    public String getDateTime(String format) {
        return this.getDateTime(format, TIME_ZONE_DEFAULT);
    }

    public String getDateTime(long timestamp, String format) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
        return simpleDateFormat.format(timestamp);
    }

    public String getTime(long timestamp, String format) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
        return simpleDateFormat.format(timestamp);
    }

    public String getDate(long timestamp, String format) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
        return simpleDateFormat.format(timestamp);
    }

    public String getEpochTimestamp(String format) {
        return getDateTime(System.currentTimeMillis(), format);
    }

    public long getTimestamp(String timestamp, String formatDateTime) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(formatDateTime);
            sdf.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
            return sdf.parse(timestamp).getTime();
        } catch (ParseException e) {
            return -1;
        }
    }

    public String convertDateToDate(String date, String oldFDate, String newFdate) {
        long time = getTimestamp(date, oldFDate);
        String ret = getDateTime(time, newFdate);
        return ret;
    }

    public Date convertDateToDate(Date date, String timeZone) {
        SimpleDateFormat sdf = new SimpleDateFormat();
        SimpleDateFormat sdfLocal = new SimpleDateFormat();

        sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
        String strDate = sdf.format(date);
        try {
            return sdfLocal.parse(strDate);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public Date convertStringToDate(String date, String format) {
        SimpleDateFormat df = new SimpleDateFormat(format);
        df.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
        try {
            return df.parse(date);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public int getDayNumberOfWeek(String dateTime, String format) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat(format);
        Date date = df.parse(dateTime);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        if (Calendar.SUNDAY == cal.get(Calendar.DAY_OF_WEEK)) {
            return 7;
        }
        return (cal.get(Calendar.DAY_OF_WEEK) - 1);
    }

    public String convertDateToString(Date date, String outFormatDate) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(outFormatDate);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
        return simpleDateFormat.format(date);
    }

    public Date getFirstDayOfWeek() {
        Calendar c = Calendar.getInstance();
        c.setFirstDayOfWeek(Calendar.MONDAY);
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return c.getTime();
    }

    public int getWeekOfYear() {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        return cal.get(Calendar.WEEK_OF_YEAR);
    }

    public String getWeekOfYear(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        return cal.get(Calendar.WEEK_OF_YEAR) + "";
    }

    public String getYear(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.YEAR) + "";
    }

    public String getMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        String month = (cal.get(Calendar.MONTH) + 1) + "";
        if (month.length() == 1) {
            month = "0" + month;
        }
        return month;
    }

    public String getDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        String retDate = cal.get(Calendar.DATE) + "";
        if (retDate.length() == 1) {
            retDate = "0" + retDate;
        }
        return retDate;
    }

    public Date getStartDateOfMonth() {
        Date today = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return calendar.getTime();
    }

    public Date getStartDateOfYear() {
        Date today = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        calendar.set(Calendar.DAY_OF_YEAR, 1);
        return calendar.getTime();
    }

    public Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days);
        return cal.getTime();
    }

    public String addDays(String dateStr, String format, int days) {
        Date date = this.convertStringToDate(dateStr, format);
        date = this.addDays(date, days);
        return this.convertDateToString(date, format);
    }

    public Date addMonths(Date date, int months) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, months);
        return cal.getTime();
    }

    public Date subtractDays(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, -days);
        return cal.getTime();
    }

    public Date subtractMonths(Date date, int months) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, -months);
        return cal.getTime();
    }

    public Date subtractSeconds(Date date, int seconds) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, -seconds);
        return cal.getTime();
    }

    public Date addHours(Date date, int hours) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.HOUR_OF_DAY, hours);
        return cal.getTime();
    }

    public Date getToday() {
        Date today = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        return calendar.getTime();
    }

    public List<String> getAllDateByRangeNew(Date startDate, Date endDate, int seconds) {

        long startTime = System.currentTimeMillis();

        List<String> ret = new ArrayList<String>();
        try {
            Date dateTemp = startDate;
            long endTime = endDate.getTime();
            while (dateTemp.getTime() <= endTime) {
                ret.add(dateTemp.getTime() + "");
                dateTemp = this.addSeconds(dateTemp, seconds);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        long endTime = System.currentTimeMillis();

        log.info("[getAllDateByRangeNew][" + (endTime - startTime) + "]");

        return ret;
    }

    public List<String> getAllDateByRange(String startDate, String endDate, String inFormatDate, String outFormatDate,
            int stepUnit, int stepValue) throws ParseException {

        List<String> ret = new ArrayList<String>();

        SimpleDateFormat df = new SimpleDateFormat(inFormatDate);
        try {

            Date _startDate = df.parse(startDate);
            Date _endDate = df.parse(endDate);

            Calendar _calStartDate = Calendar.getInstance();
            Calendar _calEndDate = Calendar.getInstance();
            _calStartDate.setTime(_startDate);
            _calEndDate.setTime(_endDate);

            long n = _calEndDate.getTimeInMillis() - _calStartDate.getTimeInMillis();
            if (n > 0) {
                do {
                    ret.add(getDateTime(_calStartDate.getTimeInMillis(), outFormatDate));
                    _calStartDate.add(stepUnit, stepValue);
                } while (_calStartDate.getTimeInMillis() < _calEndDate.getTimeInMillis());
                ret.add(getDateTime(_calEndDate.getTimeInMillis(), outFormatDate));
            } else if (n == 0) {
                ret.add(getDateTime(_calStartDate.getTimeInMillis(), outFormatDate));
            } else {
            }
        } catch (ParseException ex) {
            throw new RuntimeException(ex);
        }
        return ret;
    }

    public int calculateNumberOfDaysBetween(Date startDate, Date endDate) {
        if (startDate.after(endDate)) {
            throw new IllegalArgumentException("End date should be grater or equals to start date");
        }

        long startDateTime = startDate.getTime();
        long endDateTime = endDate.getTime();
        long milPerDay = 1000 * 60 * 60 * 24;

        int numOfDays = (int) ((endDateTime - startDateTime) / milPerDay);

        return (numOfDays + 1);
    }

    public List<String> calculateNumberOfMonthsBetween(Date startDate, Date endDate, String format) {
        List<String> strDates = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        int numOfMonthStart = 0;
        int numOfMonthEnd = 0;

        calendar.clear();
        calendar.setTime(startDate);
        numOfMonthStart = calendar.get(Calendar.YEAR) * 12 + calendar.get(Calendar.MONTH);
        calendar.set(Calendar.DATE, 1);
        startDate = calendar.getTime();

        calendar.clear();
        calendar.setTime(endDate);
        numOfMonthEnd = calendar.get(Calendar.YEAR) * 12 + calendar.get(Calendar.MONTH);

        for (int i = 0; i <= numOfMonthEnd - numOfMonthStart; i++) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
            strDates.add(simpleDateFormat.format(this.addMonths(startDate, i)));
        }

        return strDates;
    }

    public Date addSeconds(Date date, int seconds) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, seconds);
        return cal.getTime();
    }

    public int compareDate(Date date1, Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);
        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        int result = 0;
        if (cal1.compareTo(cal2) < 0) {
            result = -1;
        } else if (cal1.compareTo(cal2) > 0) {
            result = 1;
        } else {
            result = 0;
        }
        return result;
    }

    public long getTimestampByTimeZone(String timestamp, String formatDateTime, String timeZone) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(formatDateTime);
            sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
            return sdf.parse(timestamp).getTime();
        } catch (ParseException e) {
            return -1;
        }
    }

    public long getTimestampByTimeZoneDevice(String timestamp, String formatDateTime) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(formatDateTime);
            sdf.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_DEFAULT));
            return sdf.parse(timestamp).getTime();
        } catch (ParseException e) {
            return -1;
        }
    }

    public String getDateByTimeZone(long timestamp, String format, String timeZone) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone(timeZone));
        return simpleDateFormat.format(timestamp);
    }

    public Date convertTimeToGMT(long timestamp) throws ParseException {
        return new Date(timestamp);
    }

    public Date convertStringToDate(String timestamp) throws ParseException {
        return new Date(Long.parseLong(timestamp));
    }
}
