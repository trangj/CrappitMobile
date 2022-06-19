import { useMutation } from 'react-query';
import { Comment } from 'src/types/entities/comment';
import { Error } from 'src/types/error';
import axios from '../../axiosConfig';

interface Response {
  comment: Comment;
}

async function addReply({ commentId, reply }: { commentId: number, reply: Comment; }) {
  try {
    const res = await axios.post(`/api/comment/${commentId}/reply`, reply);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}

export default function useAddReply(comment: Comment) {
  return useMutation<Response, Error, any, any>(addReply, {
    onSuccess: (res) => {
      comment.children = [res.comment, ...comment.children];
    },
  });
}
