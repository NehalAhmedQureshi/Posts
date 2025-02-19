import React from "react";
import {
  Button,
  Chip,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
export const revalidate = 3600; // ISR (Incremental Static Regeneration)

export default async function Blog() {
  try {
    const response = await fetch("https://dummyjson.com/posts", {
      cache: "no-store",
      next: { tags: ["posts"] },
    });
    console.log("🚀 ~ Page ~ response:", response);
    let { posts } = await response.json();

    console.log("🚀 ~ Page ~ posts:", posts);
    let handleLike = () => {
      console.log("like");
    };
    return (
      <div className="main">
        <h1>Hello Blog</h1>
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
                      {post.tags.map((tag , index)=>(
                        <Chip label={`${tag.charAt(0).toUpperCase() + tag.splice(1)}`} />
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
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="main">No data Found!</div>;
  }
}
