import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";

export default function Event({ params }) {
  const event = {
    id: params.id,
    title: "event 1",
    visibility: true,
    startDate: "2029-08-17",
    endDate: "2029-08-18",
    startTime: "11:00",
    endTime: "14:00",
    location: "Event Location",
    organisateur: 1,
    participants: 25,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
  };

  const organisateur = {
    name: "John Doe",
    age: 25,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
    image: "../img.png",
  };

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7">
      <img
        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
        alt="Card"
        className="rounded-lg hidden object-cover md:block w-full col-span-7 h-96 shadow-md"
      />
      <div className="lg:col-span-2">
        <EventHeader event={event} />
      </div>
      <div className="lg:col-span-5">
        <EventOrganizer organisateur={organisateur} />
      </div>
      <div className="lg:col-span-3 xl:col-span-4">
        <EventDescription description={event.description} />
      </div>
      <div className="lg:col-span-4 xl:col-span-3">
        <EventShare />
      </div>
      <div className="flex items-center justify-center gap-4 lg:col-span-7">
        <Button className="md:hidden">Partager</Button>
        <Button variant={"accent"}>Rejoindre</Button>
      </div>
    </div>
  );
}
