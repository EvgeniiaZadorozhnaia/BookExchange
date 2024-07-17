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
import { SidebarProps } from "../../types/propsTypes";
import {
  Box,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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
    <div
      className="demo-app"
      style={{
        display: "flex",
        width: "92%",
        marginLeft: "80px",
        marginTop: "39px",
      }}
    >
      <div
        style={{
          width: "170px",
          marginLeft: "-60px",

          borderRadius: "7px",
          textAlign: "center",
        }}
      >
        <Sidebar events={currentEvents} />
      </div>{" "}
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
    <Box
      borderRadius="md"
      padding="2"
      boxShadow="md"
      maxHeight="540px"
      display="flex"
      flexDirection="column"
      bg="#b5c6b8"
    >
      <Heading as="h5" size="sm" mb="4">
        Ближайшие встречи ({uniqueEvents.length})
      </Heading>
      <TableContainer flex="1" overflowY="auto">
        <Table variant="simple">
          <Tbody>
            {uniqueEvents.map((event) => (
              <Tr key={event.id}>
                <Td>
                  <Stack spacing={1}>
                    <Box fontWeight="bold">
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Box>
                    <Box>{event.title}</Box>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// function SidebarEvent({ event }: SidebarEventProps) {
//   return (
//     <li>
//       <b style={{margin: "10px"}}>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i style={{display: "flex", justifyContent: "space-around", margin: "3px"}}>{" " + event.title}</i>
//     </li>
//   );
// }
