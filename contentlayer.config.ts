import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const news = defineDocumentType(() => ({
  name: "News",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  mdx: {
    rehypePlugins: [remarkGfm],
  },
  fields: {
    title: {
      type: "string",
      description: "タイトル",
      required: true,
    },
    href: {
      type: "string",
      description: "URL",
      required: true,
    },
    category: {
      type: "string",
      description: "カテゴリー",
      required: true,
    },
    date: {
      type: "string",
      description: "日付",
      required: true,
    },
    image: {
      type: "string",
      description:
        "画像 public/news に画像を配置し、その画像名(example.webp)を指定",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/docs/news",
  documentTypes: [news],
});
