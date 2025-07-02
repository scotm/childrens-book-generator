export function CSSFadeIn({
  children,
  delay = 0,
  className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const delayStyle = delay ? { animationDelay: `${delay}s` } : {};

  return (
    <div className={`animate-fade-in ${className}`} style={delayStyle}>
      {children}
    </div>
  );
}
