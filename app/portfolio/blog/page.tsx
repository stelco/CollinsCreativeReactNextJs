import Link from 'next/link';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

async function getPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
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
      <div className="blog-page">
        <CardIntro
          CardContent={{
            title: 'Headless CMS Blog Posts',
            value: 'All blog posts are fetched from WordPress via the WP REST API',
          }}
        />
        <div className="posts">
          {posts.map((post: any) => (
            <Link href={`/portfolio/blog/${post.id}`} className="post" key={post.id}>
              <h3>{post.title.rendered}</h3>
              <div
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;