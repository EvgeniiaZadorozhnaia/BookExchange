import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { createEventId } from "./event-utils";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import { CalendarEvent } from "../../types/stateTypes";
import { SidebarEventProps, SidebarProps } from "../../types/propsTypes";

export default function MyCalendar(): JSX.Element {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

  function handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Введите информацию о Вашей встрече");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent: CalendarEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);
      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      window.confirm(
        `Вы уверены, что хотите удалить '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  }

  function handleEvents(events: EventApi[]) {
    const simplifiedEvents: CalendarEvent[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.startStr || "",
      end: event.endStr || "",
      allDay: event.allDay || false,
    }));

    const uniqueEvents = simplifiedEvents.filter(
      (event, index, self) => index === self.findIndex((e) => e.id === event.id)
    );

    setCurrentEvents(uniqueEvents);
  }

  return (
    <div className="demo-app" style={{ display: "flex", width: "90%", marginLeft: "80px", marginTop: "50px" }}>
      <div className="demo-app-main" style={{ flex: 1, paddingRight: "20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          initialEvents={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
      <div style={{ flex: 0 }}>
        <Sidebar events={currentEvents} />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: {
  timeText: string;
  event: { title: string };
}) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ events }: SidebarProps) {
  const uniqueEvents = events.filter(
    (event, index, self) => index === self.findIndex((e) => e.id === event.id)
  );

  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h5>Ближайшие встречи ({uniqueEvents.length})</h5>
        <ul>
          {uniqueEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }: SidebarEventProps) {
  return (
    <li>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{" " + event.title}</i>
    </li>
  );
}
