import { StoryPageComponent } from '@/components/StoryPageComponent';

export default function StoryPage({ params }: { params: { id: string } }) {
  return <StoryPageComponent id={params.id} />;
}
