import { format } from 'date-fns';
import { anonymousImg } from '../../utils/common/variables';
import { PlayerComment } from '../../utils/type/player';
import EllipsisVerticalIcon from '@heroicons/react/20/solid/EllipsisVerticalIcon';
import { LegacyRef, useState } from 'react';
import { useClickOutside } from '../../utils/hooks';
import CommentMenu from './CommentMenu';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { updatePlayerComment } from '../../api/players';

interface PlayerCommentProps {
  comment: PlayerComment;
  onEditSuccess: (comment: PlayerComment) => void;
  onDeleteSuccess: (commentId: number) => void;
}
const PlayerCommentCard = ({ comment, onEditSuccess, onDeleteSuccess }: PlayerCommentProps) => {
  const { id, user, content, createdAt } = comment;

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(content);

  const handleEditComment = () => {
    const trimed = editComment.trim();
    if (trimed === '' || trimed === content) {
      setIsEditing(false);
      setEditComment(content);
    } else {
      updatePlayerComment(id, trimed)
        .then((res) => {
          const edited = res.data;
          onEditSuccess(edited);
          setIsEditing(false);
        })
        .catch(() => alert('문제가 발생했습니다. 다시 시도해 주세요.'));
    }
  };

  const menuRef = useClickOutside(() => setIsMenuOpened(false), isMenuOpened);

  return (
    <div className="flex items-start gap-8px">
      <div className="overflow-hidden rounded-full bg-gray-100">
        <img
          src={user.profileImage || anonymousImg}
          alt={user.username}
          className="h-48px w-48px"
        />
      </div>
      {isEditing ? (
        <div className="flex h-full flex-grow flex-col gap-4px">
          <div className="text-18px font-bold text-chelsea">{user.username}</div>
          <ReactTextareaAutosize
            placeholder="write your comment!"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            minRows={2}
            className="w-full rounded-sm border border-chelsea px-12px py-6px"
            style={{ outline: 'none', resize: 'none' }}
          />
          <div className="flex items-center justify-end gap-8px font-medium">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditComment(content);
              }}
              className="rounded-sm border border-chelsea px-8px py-4px text-chelsea"
            >
              Cancel
            </button>
            <button
              onClick={handleEditComment}
              className="rounded-sm border border-chelsea bg-chelsea px-8px py-4px text-white"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-full flex-grow flex-col gap-4px">
            <div className="text-18px font-bold text-chelsea">{user.username}</div>
            <div className="pb-12px text-16px font-medium text-gray-700">{content}</div>
            <div className="text-14px font-medium text-gray-500">
              {format(new Date(createdAt), 'yyyy년 MM월 dd일')}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <button onClick={() => setIsMenuOpened(true)} className="p-4px text-gray-700">
              <EllipsisVerticalIcon className="w-20px" />
            </button>
            {isMenuOpened && (
              <div ref={menuRef as LegacyRef<HTMLDivElement>} className="absolute top-0 right-28px">
                <CommentMenu
                  comment={comment}
                  setIsMenuOpened={setIsMenuOpened}
                  setIsEditing={setIsEditing}
                  onDeleteSuccess={onDeleteSuccess}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerCommentCard;
