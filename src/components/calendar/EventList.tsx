import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Event } from "@/lib/event-store";
import { format } from "date-fns";
import { Plus, Trash2 } from "lucide-react";

type EventListProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  events: Event[];
  onNewEvent: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (event: Event) => void;
};

export const EventList = ({
  isOpen,
  onClose,
  selectedDate,
  events,
  onNewEvent,
  onDeleteEvent,
  onEditEvent,
}: EventListProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Events for {format(selectedDate, "MMMM d, yyyy")}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-4">
          <Button onClick={onNewEvent} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
        
        <div className="mt-6 space-y-4">
          {events.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No events scheduled for this day
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border p-4 hover:bg-gray-50"
                onClick={() => onEditEvent(event)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{event.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(event.start), "h:mm a")} -{" "}
                  {format(new Date(event.end), "h:mm a")}
                </p>
                {event.description && (
                  <p className="mt-2 text-sm">{event.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};