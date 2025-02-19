import {
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  East,
  ForkLeft,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
  Visibility,
  West,
} from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import LikeButton from "@/app/components/LikeButton";
import DisLikeButton from "@/app/components/DisLikeButton";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) {
      throw new Error(`Failed to fetch, status: ${response.status}`);
    }
    const { posts } = await response.json();
    return posts.map((post) => ({ id: post.id.toString() }));
  } catch (error) {
    console.error("❌ Error fetching posts for static params:", error);
    return []; // Prevents build failure
  }
}

export default async function page({ params }) {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/posts/${id}`,{next:{tags:['post']}})
  if(!(response?.ok)){
     return(
          <Stack>
               <Typography>Data not Found!</Typography>
          </Stack>
     )
  }
  let post = await response.json()
  console.log("🚀 ~ page ~ post:", post)
  return (
    <Container maxWidth={"lg"}>
      <Stack
        width={"100%"}
        height={"90vh"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Link href={"/blog"}>
          <IconButton sx={{ position: "absolute", top: "40px", left: "15px" }}>
            <West />
          </IconButton>
        </Link>
        <Paper sx={{ padding: "20px", width: "80%" }}>
          <Stack gap={2}>
            <Typography variant="h4">{post.title || "--"}</Typography>
            <Divider />
            <Stack direction={"row"} gap={1}>
              {post?.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={`${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
                />
              ))}
            </Stack>
            <Typography variant={"body1"}>{post.body || "--"}</Typography>
            <Stack direction={"row"} gap={2}>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Visibility fontSize="small" />
                {post.views || 0}
              </Typography>
              <LikeButton text={post?.reactions?.likes || 0} />
              <DisLikeButton text={post?.reactions?.dislikes || 0} />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
