'use client';
import { useState } from 'react';
import Breadcrumbs from '@/app/ui/portfolio/breadcrumbs';
import { CardIntro } from '@/app/ui/cards';

function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?Authorization=BearerclD7SdMciVanapSZgnPan3Og`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if required by your WP API
            // 'Authorization': 'Bearer YOUR_TOKEN'
          },
          body: JSON.stringify({
            title,
            content,
            status: 'publish',
          }),
        }
      );
      if (!res.ok) {
        throw new Error('Failed to create post');
      }
      setStatus('success');
      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white dark:bg-gray-700 p-6 rounded shadow">
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="title">Title</label>
        <input
          id="title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold" htmlFor="content">Content</label>
        <textarea
          id="content"
          className="w-full p-2 border rounded"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Posting...' : 'Post to WordPress'}
      </button>
      {message && (
        <div className={`mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </form>
  );
}

export function NewBlogPostPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/portfolio/home' },
          { label: 'Blog', href: '/portfolio/blog' },
          { label: 'New Post', href: '/portfolio/blog/new-post', active: true },
        ]}
      />
      <CardIntro
        CardContent={{
          title: 'Create a New Blog Post',
          value: 'Use the form below to post a new article to WordPress via the WP REST API.',
        }}
      />
      <div className="mt-4">
        <BlogPostForm />
      </div>
    </main>
  );
}
