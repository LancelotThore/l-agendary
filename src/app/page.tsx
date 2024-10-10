import Image from "next/image";
import Button from "./ui/button";

export default function Home() {
  return (
    <div>
      <Button >
        Mon bouton
      </Button>
      <Button intent="public" size="small" rounde="full">Public</Button>
      <Button intent="private" size="small" rounde="full">Private</Button>
      <Button intent="secondary" size="large">Private</Button>
    </div>
  );
}
