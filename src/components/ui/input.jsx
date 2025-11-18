export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm mb-1">{label}</label>}
      <input
        {...props}
        className="border rounded-lg px-3 py-2 w-full"
      />
    </div>
  );
}
