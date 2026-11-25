import { Link } from "react-router";
import type { Route } from "./+types/posts";
const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

export async function loader() {
  try {
    // trying to get the data
    const res = await fetch(API_ENDPOINT); // fetch the data, get the "envalope"
    const data = await res.json(); // open the "envalope"
    if (!res.ok) {
      // handle the error
      throw new Error("Failed to fetch posts");
    }
    return { posts: data };
  } catch (error) {
    // catch the error
    if (error instanceof Response) {
      throw error;
    }

    throw new Response("Unable to connect to posts service", {
      status: 503,
      statusText: "Service unavailable",
    });
  }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData; // from the loader func above
  console.log("Hello", posts);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((p) => (
          <li>
            {p.title}
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <>
      <h1>Something went wrong</h1>
    </>
  );
}


