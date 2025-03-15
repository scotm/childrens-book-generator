import Link from 'next/link';
import { CSSButton } from '@/components/ui/animation/css-button';

export function StartCreatingButton() {
  return (
    <div className="text-center mt-12">
      <Link href="/create">
        <CSSButton size="lg" className="rounded-full px-8" animationType="bounce">
          Start Creating Now
        </CSSButton>
      </Link>
    </div>
  );
}
