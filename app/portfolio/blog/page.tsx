import Link from 'next/link';
import { Metadata } from 'next';
import blog from '@/app/portfolio/data/blog';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';
import { NewBlogPostPage } from '@/app/portfolio/blog/new-post';

const blogMetadata = blog.find((website) => website.title === 'Collins Creative | Blog');

export const metadata: Metadata = {
  title: blogMetadata?.title,
  description: blogMetadata?.description,
  keywords: blogMetadata?.keywords,
  authors: blogMetadata?.authors,
  openGraph: blogMetadata?.openGraph,
};

async function getPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`,
    {
      cache: 'no-cache',
    }
  );
  const posts = await response.json();
  return posts;
}

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          {
            label: 'Blog',
            href: '/portfolio/blog',
            active: true,
          },
        ]}
      />

        <CardIntro
          CardContent={{
            title: 'Headless CMS Blog Posts',
            value: 'All blog posts are fetched from WordPress via the WP REST API',
          }}
        />

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">

          {posts.map((post: any) => (
            <Link href={`/portfolio/blog/${post.id}`} className="post bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-col lg:overflow-hidden lg:text-md hover:dark:bg-gray-600 hover:bg-gray-100" key={post.id}>

              <div className="mb-4 text-2xl text-orange-400 dark:text-orange-300">{post.title.rendered}
              </div>

              <div
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              >
              </div>

            </Link>
          ))}
        </div>

    </main>
  );
};

export default BlogPage;