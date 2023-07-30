import { Plugin } from "../../deps.ts";
import { handler as blogSlugHandler } from "../routes/blog/[slug].tsx";
import PostPage from "../routes/blog/[slug].tsx";
import { AppBuilder } from "../routes/_app.tsx";
import { buildBlogIndexPage, buildIndexHandler } from "../routes/index.tsx";
import AuthorPage from "../routes/author/[author].tsx";
import { handler as authorHandler } from "../routes/author/[author].tsx";
import ArchivePage from "../routes/archive/index.tsx";
import { handler as archiveHandler } from "../routes/archive/index.tsx";
import TagPage from "../routes/archive/[tag].tsx";
import { handler as tagHandler } from "../routes/archive/[tag].tsx";
import { handlerBuilder as contextMiddleware } from "../routes/_middleware.ts";
export type { BlogOptions };

interface BlogOptions {
  title: string;
  navbarItems: Record<string, string>;
  rootPath: string;
  postsPerPage?: number;
}

export const DEFAULT_POSTS_PER_PAGE = 10;

export function blogPlugin(
  { postsPerPage = DEFAULT_POSTS_PER_PAGE, ...options }: BlogOptions,
): Plugin {
  return {
    name: "blog_plugin",
    middlewares: [{
      middleware: { handler: contextMiddleware(options.rootPath) },
      path: "/",
    }],
    routes: [{
      path: "/blog/[slug]",
      component: PostPage,
      handler: blogSlugHandler,
    }, {
      path: "/_app",
      component: AppBuilder(options),
    }, {
      path: "/index",
      component: buildBlogIndexPage(postsPerPage),
      handler: buildIndexHandler(postsPerPage),
    }, {
      path: "/archive",
      component: ArchivePage,
      handler: archiveHandler,
    }, {
      path: "/archive/[tag]",
      component: TagPage,
      handler: tagHandler,
    }, {
      path: "/author/[author]",
      component: AuthorPage,
      handler: authorHandler,
    }],
  };
}
