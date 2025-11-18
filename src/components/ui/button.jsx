export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{ padding: "8px 14px", borderRadius: 6, background: "#333", color: "white", border: "none" }}
      >
      {children}
    </button>
  );
}
