//import { posts } from '@/app/lib/placeholder-data';
import { Button } from '@/app/ui/components/button';
import Link from 'next/link';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';
import { auth } from '../../../../auth.config';

export default async function Page() {
    const client = await connectToDB();
    const posts = await getPosts();
    const session = await auth();
    return (
        <>
            {client && <p className='text-green-500'>Connected to the database</p>}
            {session?.user && <Link href="/blog/post/insert"><Button className="outline outline-1  border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">New +</Button></Link>}
             
            <h1 className="mb-4 text-4xl text-zinc-950 font-extrabold leading-none lg:text-6xl">Posts</h1>
            {posts?.map(post => (
                <Post key={post.id} id={post.id} title={post.title} author={post.author} content={post.content} date={post.date} />
            ))}
        </>
    )
}