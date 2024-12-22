import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalendarHeaderProps = {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export const CalendarHeader = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-background rounded-lg shadow-sm mb-4">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
        {currentMonth}
      </h2>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onPrevMonth}
          className="hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onNextMonth}
          className="hover:bg-primary/10 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};