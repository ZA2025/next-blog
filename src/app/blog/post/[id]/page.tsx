import React from 'react';
import { notFound } from 'next/navigation';
//import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';


interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const posts = await getPosts();
  const { id } = params;
  const post = posts?.find((post) => post.id === id);
  console.log('Post:', post);

  if (!post) {
    notFound();
  }

   
  return (
    <>
      <h1 className="mb-4 text-4xl text-zinc-950 font-extrabold leading-none lg:text-6xl">{post.title}</h1>
      <Post id={post.id} title={post.title} author={post.author} content={post.content} date={post.date} />

    </>
  );
}