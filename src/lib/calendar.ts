import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export const getCalendarDays = (date: Date): CalendarDay[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  // Get all days in the month
  const days = eachDayOfInterval({ start, end });
  
  // Add padding days at the start to align with weekday
  const startDay = start.getDay();
  const paddingStart = Array.from({ length: startDay }, (_, i) => {
    const paddedDate = new Date(start);
    paddedDate.setDate(-startDay + i + 1);
    return {
      date: paddedDate,
      isCurrentMonth: false,
      isToday: isToday(paddedDate)
    };
  });
  
  // Add padding days at the end to complete the grid
  const endDay = end.getDay();
  const paddingEnd = Array.from({ length: 6 - endDay }, (_, i) => {
    const paddedDate = new Date(end);
    paddedDate.setDate(end.getDate() + i + 1);
    return {
      date: paddedDate,
      isCurrentMonth: false,
      isToday: isToday(paddedDate)
    };
  });
  
  // Combine all days
  const allDays = [
    ...paddingStart,
    ...days.map(date => ({
      date,
      isCurrentMonth: true,
      isToday: isToday(date)
    })),
    ...paddingEnd
  ];
  
  return allDays;
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const nextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const previousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};