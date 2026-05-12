import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "hamza waleed",
    description: site.description,
    start_url: "/",
    display: "minimal-ui",
    background_color: "#1c1610",
    theme_color: "#1c1610",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
