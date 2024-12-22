import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/lib/event-store";
import { useState } from "react";
import { format } from "date-fns";

type EventDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id">) => void;
  selectedDate: Date;
  event?: Event;
};

export const EventDialog = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  event,
}: EventDialogProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startTime, setStartTime] = useState(event?.start?.split("T")[1]?.slice(0, 5) || "09:00");
  const [endTime, setEndTime] = useState(event?.end?.split("T")[1]?.slice(0, 5) || "10:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    onSave({
      title,
      description,
      start: `${dateStr}T${startTime}:00`,
      end: `${dateStr}T${endTime}:00`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "New Event"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start" className="text-sm font-medium">
                Start Time
              </label>
              <Input
                id="start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="end" className="text-sm font-medium">
                End Time
              </label>
              <Input
                id="end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};