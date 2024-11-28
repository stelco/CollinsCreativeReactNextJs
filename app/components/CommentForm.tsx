'use client';

import { Fragment, useCallback, useState } from 'react';
import Axios from 'axios';
import { Button } from '@/app/ui/button';

export default ({ ...props }) => {
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [content, setContent] = useState('');
    const post = props.post_id; // getting this from the main component

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/comments`;
        try {
            const response = await Axios.post(url, {
                author_name: authorName,
                author_email: authorEmail,
                content: content,
                post: post
            });
            console.log(response);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }, [authorName, authorEmail, content, post]);

    return (
        <Fragment>
            
            <div className='mt-4 mb-4 text-2xl text-orange-400 dark:text-orange-300'>Add a Comment</div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <div className='text-md text-orange-400 dark:text-orange-300'>Your Name</div>
                    <input
                        type="text"
                        name="commenter-name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />
                <div className='text-md text-orange-400 dark:text-orange-300'>Your Email</div>
                    <input
                        type="email"
                        name="commenter-email"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                    />
                <div className='text-md text-orange-400 dark:text-orange-300'>Your Comment</div>
                    <textarea
                        name="commenter-message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <Button
                        type="submit"
                        className="flex h-10 mt-4 items-center justify-center rounded-xl px-4 text-md font-medium text-white transition-colors bg-orange-400 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 dark:text-slate-800"
                        style={{ alignSelf: 'center' }}
                    >
                Submit
              </Button>
                </div>
            </form>

        </Fragment>
    );
};