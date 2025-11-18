export default function Card({ children }) {
  return (
    <div style={{ padding: 20, margin: "16px 0", border: "1px solid #ccc", borderRadius: 10 }}>
      {children}
    </div>
  );
}
