import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';

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
      <div className="single-blog-page m-4">
        <h2>{post.title.rendered}</h2>
        <div className="blog-post">
          <p
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></p>
        </div>
      </div>
    </main>
  );
};

export default page;