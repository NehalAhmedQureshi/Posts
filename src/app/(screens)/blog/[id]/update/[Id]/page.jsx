import { Stack, TextField, Typography, Button } from "@mui/material";
import { revalidateTag } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

async function updatePost(formData) {
    "use server"; // This makes it a server action
    console.log("🚀 ~ updatePost ~ formData:", formData)

  const Id = formData.get("Id");
  const title = formData.get("title");
  const body = formData.get("body");

  const response = await fetch(`https://dummyjson.com/posts/${Id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) {
    return { error: "Failed to update post." };
  }

  // Revalidate the cache
  revalidateTag("post");

  redirect(`/blog`);
  return { success: true };
}

export default async function Page({ params }) {
  let { Id } = await params;
  let response = await fetch(`https://dummyjson.com/posts/${Id}`, {
    next: { tags: ["post"] },
  });

  if (!response.ok) {
    return (
      <Stack>
        <Typography>Data not Found!</Typography>
      </Stack>
    );
  }

  let post = await response.json();

  return (
    <form action={updatePost}>
      <Stack gap={2}>
        <Typography variant="h5">Update Post</Typography>

        <input  name="Id" value={Id} />

        <TextField name="title" defaultValue={post?.title || ""} label="Title" />
        <TextField
          name="body"
          defaultValue={post?.body || ""}
          label="Description"
          multiline
          minRows={3}
        />
        <Button type="submit" variant="contained">Update</Button>
      </Stack>
    </form>
  );
}
