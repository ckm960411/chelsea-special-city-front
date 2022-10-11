import { PlayerComment } from '../../utils/type/player';
import PlayerCommentCard from './PlayerCommentCard';

interface PlayerCommentsProps {
  comments: PlayerComment[];
}
const PlayerComments = ({ comments }: PlayerCommentsProps) => {
  return (
    <div className="flex flex-col gap-16px px-16px">
      {comments.map((comment) => (
        <PlayerCommentCard comment={comment} />
      ))}
    </div>
  );
};

export default PlayerComments;