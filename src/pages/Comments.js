import React, { useState, useEffect } from 'react';
import './Comments.css';

//function Comments() {
const Comments = () => {
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // ��������� ��������� ��� ������
  const URL='http://react.nok-group.eu/cgi-bin/comments.cgi';
//  const URL='http://portfolio-react/cgi-bin/comments.cgi';

 // ������� ��� �������� �����������
  const deleteComment = async (id) => {
      const formData = new URLSearchParams();
      formData.append('id', id);
      formData.append('action', 'delete');

    const requestOptions = {
      method: 'POST',
      body: `id=${id}&action=delete`,
//      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await fetch(URL, requestOptions);
      if (response.ok) {
        await fetchComments(); // ��������� ������ ������������ ����� ��������
      } else {
        console.error('Error deleting comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(URL);
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
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkButtonState(); // ��������� ��������� ������ ��� ��������� email
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkButtonState(); // ��������� ��������� ������ ��� ��������� email
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    checkButtonState(); // ��������� ��������� ������ ��� ��������� �����������
  };

  const checkButtonState = () => {
    // ���������, ��������� �� ��� ����
    if (email.trim() !== '' && newComment.trim() !== '' && name.trim() !== '') {
      setIsButtonDisabled(false); // ���� ���������, ������ ������ ��������
    } else {
      setIsButtonDisabled(true); // � ��������� ������ ������ ������ ����������
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== '' && newComment.trim() !== '' && name.trim() !== '') {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('comment', newComment);
      formData.append('name', name);

      try {
        const response = await fetch(URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.ok) {
          await fetchComments();
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
      <h1 className="title-1">Leave a Comment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <label>
          Email:<br />
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          Comment:<br />
          <textarea value={newComment} onChange={handleCommentChange} required />
        </label>
        <br />
        <button className="button-15" type="submit" disabled={isButtonDisabled}>Submit</button>
      </form>

      <div className="comment-list">
        <h2>Comments:</h2>
        {comments.map((comment, index) => {
          console.log(comment);
          if (comment.trim() !== '') { // �������� �� ������ ������
            const [id, ip, name, email, text, iip] = comment.split('|');
            const shouldShowDeleteButton = iip === ip; // ���������� ������� IP � IP �����������

            // ��������� ������ � ����������� �� ��������� IP
            const commentClasses = shouldShowDeleteButton ? 'comment right' : 'comment left';

            return (
              <div className={commentClasses} id={id} key={id}>
                <ul>
                  <li className="username">{name}</li>
                  <li>Comment: {text}</li>
              {shouldShowDeleteButton && (

                  <li className="delete">
                    <button className="delete-button" onClick={() => deleteComment(id)}>
                      Delete
                    </button>
                  </li>
          )}
                </ul>
              </div>
              );
            } else {
              return null; // ���������� null ��� ������ �����
            }
         })}
     </div>



    </div>
  );
}

export default Comments;