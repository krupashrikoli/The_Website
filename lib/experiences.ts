import { EXPERIENCE_POSTS } from "@/lib/constants";

export type ExperiencePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string | null;
  alt: string;
  published: boolean;
};

function publishedPosts() {
  return EXPERIENCE_POSTS.filter((post) => post.published);
}

export function getAllExperiencePosts(): ExperiencePost[] {
  return [...publishedPosts()];
}

export function getExperiencePost(slug: string): ExperiencePost | undefined {
  return publishedPosts().find((post) => post.slug === slug);
}

export function getAllExperienceSlugs(): string[] {
  return publishedPosts().map((post) => post.slug);
}
