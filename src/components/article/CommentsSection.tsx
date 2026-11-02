import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, CornerDownRight, Send, AlertCircle, Shield } from 'lucide-react';
import { Comment } from '../../types';

interface CommentsSectionProps {
  articleId: string;
  comments: Comment[];
  onAddComment: (content: string, authorName: string) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string, content: string, authorName: string) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  articleId,
  comments,
  onAddComment,
  onLikeComment,
  onReplyComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState<string | null>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !authorName.trim()) return;
    onAddComment(commentText.trim(), authorName.trim());
    setCommentText('');
  };

  const handleSubmitReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyText.trim() || !replyAuthor.trim()) return;
    onReplyComment(commentId, replyText.trim(), replyAuthor.trim());
    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <section className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-600" />
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
            Reader Discussion ({comments.length})
          </h3>
        </div>
        <span className="text-xs text-stone-500 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-stone-400" />
          <span>Moderated by Newsroom Standards</span>
        </span>
      </div>

      {/* Post a Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-stone-50 dark:bg-stone-900/60 p-4 border border-stone-200 dark:border-stone-800 mb-8 space-y-3">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
          Join the conversation
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name or display handle (e.g. Kiprono, Nairobi)"
            required
            className="px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your perspective respectfully. Contributions are held to high community standards."
          rows={3}
          required
          className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-stone-500">
            Civil, constructive commentary only. Defamation and hate speech are strictly filtered.
          </span>
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Perspective</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comm) => (
          <div key={comm.id} className="pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                  {comm.authorName[0]?.toUpperCase()}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {comm.authorName}
                  </span>
                  <span className="text-[11px] text-stone-500 ml-2">
                    {comm.timestamp}
                  </span>
                </div>
              </div>

              {/* Report button */}
              <button
                onClick={() => setReportSubmitted(comm.id)}
                className="text-[10px] text-stone-400 hover:text-red-500 transition-colors"
                title="Report inappropriate comment"
              >
                {reportSubmitted === comm.id ? 'Reported to Moderation' : 'Report'}
              </button>
            </div>

            <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm leading-relaxed mb-3">
              {comm.content}
            </p>

            {/* Interaction Bar */}
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <button
                onClick={() => onLikeComment(comm.id)}
                className="flex items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{comm.likes}</span>
              </button>

              <button
                onClick={() => setActiveReplyId(activeReplyId === comm.id ? null : comm.id)}
                className="flex items-center gap-1 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
            </div>

            {/* Inline Reply Form */}
            {activeReplyId === comm.id && (
              <form onSubmit={(e) => handleSubmitReply(e, comm.id)} className="mt-3 pl-4 border-l-2 border-amber-500 space-y-2">
                <input
                  type="text"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Your name"
                  required
                  className="px-2.5 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Replying to ${comm.authorName}...`}
                  rows={2}
                  required
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Send Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(null)}
                    className="px-3 py-1 text-xs text-stone-500 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Nested Replies */}
            {comm.replies && comm.replies.length > 0 && (
              <div className="mt-3 pl-4 sm:pl-6 border-l border-stone-200 dark:border-stone-800 space-y-3">
                {comm.replies.map((rep) => (
                  <div key={rep.id} className="text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        {rep.authorName}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {rep.timestamp}
                      </span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {rep.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
