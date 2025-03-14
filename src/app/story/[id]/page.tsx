import { StoryPageComponent } from '@/components/StoryPageComponent';

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StoryPageComponent id={id} />;
}
