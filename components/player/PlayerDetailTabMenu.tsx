import { Dispatch, SetStateAction } from 'react';

interface PlayerDetailTabMenuProps {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onScroll?: () => void;
}
const PlayerDetailTabMenu = ({
  activeIndex,
  setActiveIndex,
  onScroll,
}: PlayerDetailTabMenuProps) => {
  const handleClick = (index: number) => () => {
    setActiveIndex(index);
    onScroll?.();
  };

  return (
    <div>
      <div className="grid grid-cols-3 text-center font-bold">
        {['About', 'Comment', 'Gallery'].map((tab, i) => {
          return (
            <div
              key={tab}
              onClick={handleClick(i)}
              className="cursor-pointer border-2 border-transparent py-12px"
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="h-2px w-full bg-gray-100">
        <div
          className="h-full w-1/3 bg-chelsea duration-300"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default PlayerDetailTabMenu;