import React, { useState, useEffect } from 'react';
import './Comments.css';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // ��������� ��������� ��� ������

  const fetchComments = async () => {
    try {
      const response = await fetch('http://react.nok-group.eu/cgi-bin/comments.cgi');
      if (response.ok) {
        const text = await response.text();
        const commentArray = text.split('\n');
        setComments(commentArray);
      } else {
        console.error('Error fetching comments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000); // ����� ������ 10 ������
    return () => clearInterval(interval);
  }, []); // ���������� ������ ��� ������������


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkButtonState(); // ��������� ��������� ������ ��� ��������� email
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    checkButtonState(); // ��������� ��������� ������ ��� ��������� �����������
  };

  const checkButtonState = () => {
    // ���������, ��������� �� ��� ����
    if (email.trim() !== '' && newComment.trim() !== '') {
      setIsButtonDisabled(false); // ���� ���������, ������ ������ ��������
    } else {
      setIsButtonDisabled(true); // � ��������� ������ ������ ������ ����������
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== '' && email.trim() !== '') {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('comment', newComment);

      try {
        const response = await fetch('http://react.nok-group.eu/cgi-bin/comments.cgi', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.ok) {
          await fetchComments(); // ���������� ������ ������������
          setNewComment('');
          setEmail('');
          setIsButtonDisabled(true); // ����� �������� ����� ������ ������ ����������
        } else {
          console.error('Error submitting comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="comments">
      <h1>Leave a Comment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:<br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
	 Comment:<br />
	   <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
        </label>
        <br />
        <button className="button-15" type="submit" disabled={isButtonDisabled}>Submit</button>
      </form>

      <div className="comment-list">
        <h2>Comments:</h2>
        {comments.map((comment, index) => {
          if (comment.trim() !== '') { // �������� �� ������ ������
          const [commentEmail, commentText] = comment.split('|');
          return (
            <div key={index} className="comment">
              <ul>
                <li>Email: {commentEmail}</li>
                <li>Comment: {commentText}</li>
              </ul>
            </div>
          );
        } else {
             return null; // ���������� null ��� ������ �����
          }})}
      </div>
    </div>
  );
}

export default Comments;