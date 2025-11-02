import { posts } from "@/app/data";

export const GET = (request) => {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");

  if (query) {
    const result = posts.filter(({ title }) => {
      return title.toLowerCase().includes(query);
    });

    return Response.json(result);
  }

  return Response.json(posts);
};

export const POST = async (request) => {
  const { title } = await request.json();

  if (!title) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Title is required",
      }),
      {
        status: 400,
      }
    );
  }

  const newPost = {
    id: posts.length + 1,
    title,
  };

  posts.push(newPost);

  return new Response(
    JSON.stringify({
      success: true,
      message: "New post created",
      newPost,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
};
