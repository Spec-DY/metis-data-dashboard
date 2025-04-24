export default function Background({ children }) {
  return (
    <div className="relative bg-gradient-to-t from-blue-800 to-blue-900 h-full w-full">
      {children}
    </div>
  );
}
