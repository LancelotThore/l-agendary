import EventHeader from "../components/ui/eventHeader";
import { EventOrganizer } from "../components/ui/eventOrganizer";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-10/12 m-auto">
      <div className="w-full">
        <EventHeader></EventHeader>
        <EventOrganizer></EventOrganizer>
      </div>
    </div>
  );
}
