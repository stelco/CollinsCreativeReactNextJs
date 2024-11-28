import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';
import CommentList from '@/app/components/CommentList';
import CommentForm from '@/app/components/CommentForm'

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
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`,
    {
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    console.error('Error fetching post:', response.statusText);
    return null;
  }
  try {
    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

async function getComments(postId: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/comments?post=${postId}`,
    {
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    console.error('Error fetching comments:', response.statusText);
    return [];
  }
  try {
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}

// Handle comments logic here if needed

const page = async ({ params }: { params: { postId: string } }) => {
  const post = await getSinglePost(params.postId);
  const comments = await getComments(params.postId);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col" suppressHydrationWarning>
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

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3">

        <div className="grid self-start bg-white items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-col lg:overflow-hidden lg:text-md lg:col-span-2 border border-dashed">
          
          <h2 className='mb-4 text-2xl text-orange-400 dark:text-orange-300'>
            {post.title.rendered}
          </h2>

          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          >
          </div>

        </div>

        <div className="bg-white ml-1 items-start text-grey-400 dark:bg-gray-700 dark:text-slate-200 px-4 py-4 text-left text-lg lg:flex-col lg:overflow-hidden lg:text-md">
          <CommentList comments={comments} />
          <CommentForm post_id={params.postId}/>
        </div>

      </div>
    </main>
  );
};

export default page;