import { site } from "./site";

const ogImage = {
  url: `${site.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: site.title,
  type: "image/png",
};

export const defaultOgImages = [ogImage];
export const defaultTwitterImages = [ogImage.url];
