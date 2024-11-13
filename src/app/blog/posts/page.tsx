import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

export default function Page() {
    return (
        <>
            <h1 className="mb-4 text-4xl text-zinc-950 font-extrabold leading-none lg:text-6xl">Posts</h1>
            {posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </>
    )
}