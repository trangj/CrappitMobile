import { useMutation, useQueryClient } from 'react-query';
import { Topic } from 'src/types/entities/topic';
import axios from '../../axiosConfig';

async function followTopic(topic: string) {
  try {
    const res = await axios.post(`/api/topic/${topic}/followtopic`);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
}

export default function useAddTopicFollow(topic: Topic) {
  const queryClient = useQueryClient();
  return useMutation<any, any, any, any>(followTopic, {
    onSuccess: (res) => {
      queryClient.setQueryData(['topic', topic.title], (initialData: any) => {
        initialData.user_followed_id = res.user_followed_id;
        initialData.number_of_followers += res.user_followed_id ? 1 : -1;
        return initialData;
      });
    },
  });
}
