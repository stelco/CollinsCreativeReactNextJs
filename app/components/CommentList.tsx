import React from 'react';
import { Comment } from '@/app/lib/definitions';

interface Props {
    comments: Comment[] | null;
}

const CommentList: React.FC<Props> = ({ comments }) => {
    let numComments = comments !== null ? comments.length : 0;
    return (
        <div className="comments col-6 col-12-small">

            <div className='mt-4 mb-4 text-2xl text-orange-400 dark:text-orange-300'>{numComments} Comment(s)</div>

            {comments === null ? (
                <p>Be the first one to comment...</p>
            ) : (
                comments.map((comment: Comment) => {
                    return (
                        <div key={comment.id} className="comment">
                            <img className="comment-avatar" src={comment.author_avatar_urls[48]} />
                            <h4>{comment.author_name}</h4>
                            <div
                                key={comment.id}
                                dangerouslySetInnerHTML={ { __html : comment.content.rendered } }>
                            </div>
                            <div className='border-b border-dashed mt-4 mb-4'/>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default CommentList;