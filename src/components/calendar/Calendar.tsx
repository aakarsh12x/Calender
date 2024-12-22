import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { EventDialog } from "./EventDialog";
import { EventList } from "./EventList";
import { getCalendarDays, getMonthYear, nextMonth, previousMonth, formatDate } from "@/lib/calendar";
import { Event, getEventsForDate, saveEvent, deleteEvent, updateEvent } from "@/lib/event-store";
import { useToast } from "@/components/ui/use-toast";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const { toast } = useToast();

  const days = getCalendarDays(currentDate);
  const events = selectedDate ? getEventsForDate(formatDate(selectedDate)) : [];

  const handlePrevMonth = () => {
    setCurrentDate(previousMonth(currentDate));
  };

  const handleNextMonth = () => {
    setCurrentDate(nextMonth(currentDate));
  };

  const handleSelectDay = (date: Date) => {
    setSelectedDate(date);
    setShowEventList(true);
  };

  const handleNewEvent = () => {
    setSelectedEvent(undefined);
    setShowEventDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, "id">) => {
    if (!selectedDate) return;

    const dateStr = formatDate(selectedDate);
    
    if (selectedEvent) {
      updateEvent(dateStr, { ...eventData, id: selectedEvent.id });
      toast({
        title: "Event updated",
        description: "Your event has been updated successfully.",
      });
    } else {
      saveEvent(dateStr, { ...eventData, id: crypto.randomUUID() });
      toast({
        title: "Event created",
        description: "Your event has been created successfully.",
      });
    }
    
    setSelectedEvent(undefined);
    setShowEventDialog(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (!selectedDate) return;
    
    deleteEvent(formatDate(selectedDate), eventId);
    toast({
      title: "Event deleted",
      description: "Your event has been deleted successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <CalendarHeader
        currentMonth={getMonthYear(currentDate)}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      <CalendarGrid
        days={days}
        onSelectDay={handleSelectDay}
        selectedDate={selectedDate}
      />
      
      {selectedDate && (
        <>
          <EventList
            isOpen={showEventList}
            onClose={() => setShowEventList(false)}
            selectedDate={selectedDate}
            events={events}
            onNewEvent={handleNewEvent}
            onDeleteEvent={handleDeleteEvent}
            onEditEvent={handleEditEvent}
          />
          
          <EventDialog
            isOpen={showEventDialog}
            onClose={() => setShowEventDialog(false)}
            onSave={handleSaveEvent}
            selectedDate={selectedDate}
            event={selectedEvent}
          />
        </>
      )}
    </div>
  );
};