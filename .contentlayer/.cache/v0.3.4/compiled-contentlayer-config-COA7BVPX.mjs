// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
var news = defineDocumentType(() => ({
  name: "News",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  mdx: {
    rehypePlugins: [remarkGfm],
  },
  fields: {
    title: {
      type: "string",
      description: "\u30BF\u30A4\u30C8\u30EB",
      required: true,
    },
    href: {
      type: "string",
      description: "URL",
      required: true,
    },
    category: {
      type: "string",
      description: "\u30AB\u30C6\u30B4\u30EA\u30FC",
      required: true,
    },
    date: {
      type: "string",
      description: "\u65E5\u4ED8",
      required: true,
    },
    image: {
      type: "string",
      description:
        "\u753B\u50CF public/news \u306B\u753B\u50CF\u3092\u914D\u7F6E\u3057\u3001\u305D\u306E\u753B\u50CF\u540D(example.jpg)\u3092\u6307\u5B9A",
      required: true,
    },
  },
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/docs/news",
  documentTypes: [news],
});
export { contentlayer_config_default as default, news };
//# sourceMappingURL=compiled-contentlayer-config-COA7BVPX.mjs.map
