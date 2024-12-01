import { createClient, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function connectToDB() {
    const client = createClient();
    await client.connect();

    try {
        if (client) {
            console.log('Connected to the database');
            return client;
        }
         
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export async function getPosts() {
    try {
        noStore();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql`SELECT * FROM posts`;
        console.log("DATA", data.rows);
        return data.rows;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export async function deletePost(postId: string, userId: string) {
    const client = await connectToDB();

    try {
        // Ensure that the user is the author of the post
        const result = await sql`
            SELECT * FROM posts WHERE id = ${postId} AND author = ${userId}
        `;

        // If no post found or the user is not the author, reject the action
        if (result.rows.length === 0) {
            throw new Error('You are not authorized to delete this post');
        }

        // Delete the post
        await sql`
            DELETE FROM posts WHERE id = ${postId}
        `;

        console.log(`Post with ID ${postId} has been deleted.`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    } finally {
        if (client) {
            await client.end();
        }
    }
}
