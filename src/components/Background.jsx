export default function Background({ children }) {
  return (
    <div class="relative h-auto">
      <div class="absolute inset-0">
        <div class="absolute inset-0 -z-10 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#f0f0f0_2px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_2px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      </div>

      {children}
    </div>
  );
}
