export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-gray-800 text-white hover:opacity-80 transition ${className}`}
    >
      {children}
    </button>
  );
}
