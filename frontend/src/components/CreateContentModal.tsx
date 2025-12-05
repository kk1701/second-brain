import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal(props: ModalProps) {
  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 opacity-70 flex justify-center items-center">
          <div className="bg-white opacity-100 p-4 rounded-md">
            <div className="flex justify-end mb-6">
              <button onClick={props.onClose} className="cursor-pointer">
                <CrossIcon size="md" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-2 my-2">
              <Input
                placeholder="Title"
                onChange={() => {
                  console.log("changed");
                }}
              />
              <Input
                placeholder="Link"
                onChange={() => {
                  console.log("changed");
                }}
              />
            </div>

            <div className="flex justify-center p-2 mt-4">
              <Button
                variant="primary"
                text="Submit"
                size="md"
                onClick={props.onClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
