import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 ">
      <CreateContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />

      <div className="flex justify-end gap-5 pr-5">
        <Button
          startIcon={PlusIcon({ size: "md" })}
          variant="primary"
          text="Add Content"
          size="md"
          onClick={() => {
            setModalOpen(true);
          }}
        ></Button>
        <Button
          startIcon={ShareIcon({ size: "md" })}
          variant="secondary"
          text="Share Brain"
          size="md"
          onClick={() => {}}
        ></Button>
      </div>

      <div className="flex gap-6">
        <Card
          type="twitter"
          link="https://x.com/elonmusk/status/1996989600602996811?s=20"
          title="First Tweet"
        />
        <Card
          type="youtube"
          link="https://youtu.be/p9zYf4wYnIo?si=_17M3StDqGghnYZc"
          title="First Video"
        />
      </div>
    </div>
  );
}

export default App;
