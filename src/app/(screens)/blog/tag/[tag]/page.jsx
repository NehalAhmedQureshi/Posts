import {
  Chip,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
  try {
    const response = await fetch("https://dummyjson.com/posts/tags");
    if (!response.ok) {
      throw new Error(`Failed to fetch, status: ${response.status}`);
    }
    const tags = await response.json();
    return tags.map((tag) => ({ tag: tag.slug }));
  } catch (error) {
    console.error("❌ Error fetching posts for static params:", error);
    return []; // Prevents build failure
  }
}
export default async function Tag({ params }) {
  try {
    let { tag } = await params;
    let response = await fetch(`https://dummyjson.com/posts/tag/${tag}`,{next:{tags:['tags']}});
    let { posts } = await response.json();
    return (
      <Container maxWidth="lg">
        <Stack gap={3}>
          <Typography>
            Search Related To:{" "}
            <Chip label={tag?.charAt(0)?.toUpperCase() + tag?.slice(1)} />
          </Typography>
          <Grid2 container spacing={2}>
            {posts?.map((post, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Link
                  href={`/blog/${post?.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper className="card" key={index} sx={{ padding: "20px" }}>
                    <Stack gap={1}>
                      <Typography variant="h6" className="title">
                        {post.title}
                      </Typography>
                      <Stack direction={"row"} gap={1}>
                        {post.tags.map((tag, index) => (
                          <Chip
                          key={index}
                            label={`${
                              tag.charAt(0).toUpperCase() + tag.slice(1)
                            }`}
                          />
                        ))}
                      </Stack>
                      <Divider />
                      <Typography variant="body1" className="body">
                        {post.body}
                      </Typography>
                    </Stack>
                  </Paper>
                </Link>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Container>
    );
  } catch (error) {
    console.log("🚀 ~ Tag ~ error:", error);
    return <div>Failed to Load!</div>;
  }
}
