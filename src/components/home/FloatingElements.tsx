export function FloatingElements() {
  return (
    <>
      <div
        className="absolute top-12 left-12 opacity-60 animate-float-up-down"
        style={{ animationDuration: '6s' }}
      >
        <div className="text-5xl">✨</div>
      </div>

      <div
        className="absolute bottom-12 right-12 opacity-60 animate-float-side-to-side"
        style={{ animationDuration: '7s' }}
      >
        <div className="text-5xl">☁️</div>
      </div>
    </>
  );
}
