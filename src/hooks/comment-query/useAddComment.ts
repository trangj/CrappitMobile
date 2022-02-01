import { useMutation, useQueryClient } from "react-query";
import axios from "../../axiosConfig";
import { Post } from "src/types/entities/post";
import { Comment } from "src/types/entities/comment";
import { Error } from "src/types/error";

interface Response {
	comment: Comment;
}

async function addComment({ newComment }: { newComment: Comment; }) {
	try {
		const res = await axios.post(`/api/comment`, newComment);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}

export default function useAddComment(post: Post) {
	const queryClient = useQueryClient();
	return useMutation<Response, Error, any, any>(addComment, {
		onSuccess: (res) => {
			queryClient.setQueryData(["comments", post.id], (initialData: any) => [res.comment, ...initialData]);
		},
	});
}
