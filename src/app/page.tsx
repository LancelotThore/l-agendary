import EventHeader from "../components/ui/eventHeader";
import {EventAuthor} from "../components/ui/eventCard";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-10/12 m-auto">
      <div className="w-full">
        <EventHeader></EventHeader>
        <EventAuthor></EventAuthor>
      </div>
    </div>
  );
}
