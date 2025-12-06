import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
      <div className="bg-white rounded border-none min-w-80 min-h-90 flex flex-col items-center justify-center p-4 gap-4">
        <span className="text-2xl font-bold my-6">Signup</span>
        <Input placeholder="Username" onChange={() => {}} />
        <Input placeholder="Password" onChange={() => {}} />

        <Button variant="primary" size="md" text="Submit" onClick={() => {}} />

        <span className="flex gap-2 items-center justify-center mt-4">
          Already have an account?{" "}
          <Button variant="secondary" size="sm" text="Signin" />{" "}
        </span>
      </div>
    </div>
  );
}
