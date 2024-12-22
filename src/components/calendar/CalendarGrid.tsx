import { CalendarDay } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type CalendarGridProps = {
  days: CalendarDay[];
  onSelectDay: (date: Date) => void;
  selectedDate: Date | null;
};

export const CalendarGrid = ({ days, onSelectDay, selectedDate }: CalendarGridProps) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-px bg-sidebar-border rounded-lg overflow-hidden shadow-lg">
      {weekDays.map((day) => (
        <div
          key={day}
          className="bg-sidebar-accent p-2 text-center text-sm font-medium text-sidebar-accent-foreground"
        >
          {day}
        </div>
      ))}
      
      {days.map((day, index) => {
        const isSelected = selectedDate && format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        
        return (
          <button
            key={index}
            onClick={() => onSelectDay(day.date)}
            className={cn(
              "h-24 p-2 text-left transition-all hover:bg-sidebar-accent/50",
              "border border-transparent relative group",
              {
                "bg-background": day.isCurrentMonth,
                "bg-muted/50 text-muted-foreground": !day.isCurrentMonth,
                "ring-2 ring-primary ring-offset-2 bg-primary/5": isSelected,
              }
            )}
          >
            <time
              dateTime={format(day.date, 'yyyy-MM-dd')}
              className={cn(
                "ml-auto flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                {
                  "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg ring-2 ring-primary/20": day.isToday,
                  "group-hover:bg-primary/10": !day.isToday,
                }
              )}
            >
              {format(day.date, "d")}
            </time>
          </button>
        );
      })}
    </div>
  );
};