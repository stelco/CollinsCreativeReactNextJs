import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';
import Image from 'next/image';

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
  );
  const posts = await response.json();

  return posts.map((post: any) => ({
    postId: post.id.toString(),
  }));
}

async function getSinglePost(postId: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`
  );
  const post = await response.json();
  return post;
}

const page = async ({ params }: { params: { postId: string } }) => {
  const post = await getSinglePost(params.postId);

  if (!post) {
    return <div>Loading...</div>;
  }

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
          {
            label: 'Blog Post',
            href: '/portfolio/blog/' + params.postId,
            active: true,
          },
        ]}
      />
      <CardIntro
        CardContent={{
          title: 'Headless CMS Blog Posts',
          buttonLink: true,
          buttonLinkUrl: '/portfolio/blog',
          value2: 'Back to all posts',
        }}
      />
      <div className="single-blog-page mt-4">
        <div className="blog-post bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-col lg:overflow-hidden lg:text-md">

          <h2 className='mb-8'>{post.title.rendered}</h2>

          {post.featured_media && (
                <Image
                src={post.featured_media.source_url}
                alt={post.title.rendered}
                width={1024}
                height={532}
                layout="responsive"
                />
            )}

          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>

        </div>
      </div>
    </main>
  );
};

export default page;