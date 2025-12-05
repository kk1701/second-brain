interface InputProps {
  onChange: () => void;
  placeholder: string;
}

export function Input(props: InputProps) {
  return (
    <div>
      <input
        placeholder={props.placeholder}
        type="text"
        className="px-4 py-2 border rounded"
        onChange={props.onChange}
      />
    </div>
  );
}