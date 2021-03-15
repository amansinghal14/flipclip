import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import { db } from './firebase';
import './Post.css';

const Post = ({ postId, user, username, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // console.log('POST', comments);
    let unsubscribe;
    if(postId) {
      unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        setComments(snapshot.docs.map(doc => doc.data()));
      });
    }
    return () => {
      unsubscribe();
    }
  }, [postId]);

  const postComment = e => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src="something" alt={username.toUpperCase()} />
        <h3>{username}</h3>
      </div>
      <img 
        className="post__image"
        src={imageUrl} 
        alt=""
      />
      <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
        {comments.map(cmt => (
          <p key={cmt.timestamp}>
            <strong>{cmt.username}</strong> {cmt.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input 
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="post__button" disabled={!comment} type="submit" onClick={postComment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;