import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-4xl text-zinc-950 font-extrabold leading-none lg:text-6xl">{post.title}</h1>
      <Post {...post} />
    </>
  );
}