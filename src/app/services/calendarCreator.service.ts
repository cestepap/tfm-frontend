import { Day } from "../models/Day";

export class CalendarCreator {
  private currentYear: number;
  private currentMonthIndex: number;

  constructor() {
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth(); 
  }

  public getCurrentMonth(): Day[] {
    return this.getMonth(this.currentMonthIndex, this.currentYear);
  }

  public getMonth(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    //create empty days
    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }
    days.push(firstday);
    //

    let countDaysInMonth = new Date(year, monthIndex +1, 0).getDate();
    for (let i = 2; i < countDaysInMonth +1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    return days;
  }

  public getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 0:
        return "Enero";      
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";

      default:
        return "";
    }
  }

  public getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return "Su"; // Sunday
      case 1:
        return "Mo"; // Monday
      case 2:
        return "Tu"; // Tuesday
      case 3:
        return "We"; // Wednesday
      case 4:
        return "Th"; // Thursday
      case 5:
        return "Fr"; // Friday
      case 6:
        return "Sa"; // Saturday

      default:
        return "";
    }
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    let day = new Day();

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);

    day.number = dayNumber;
    day.year = this.currentYear;

    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayNumber);

    return day;
  }
}