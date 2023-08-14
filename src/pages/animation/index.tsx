import { FC, useState } from "react";
import FetchAnimations from "./features/fetch-animations";
import ModalCreateAnimation from "./features/modal-create-animations";
import { AnimationProvider } from "./context/animation-context";
import FilterAnimation from "./features/filter-animations";

interface Props {}

const Animations: FC<Props> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <AnimationProvider>
      <div>
        <FilterAnimation />
        <div className="text-right my-3">
          <button
            className="rounded px-4 py-3 bg-blue-500 "
            onClick={handleOpen}
          >
            + Add Animation
          </button>
        </div>
        {open && (
          <ModalCreateAnimation
            setIsCreateSuccess={setIsCreateSuccess}
            open={open}
            handleClose={handleClose}
          />
        )}
        <FetchAnimations />
      </div>
    </AnimationProvider>
  );
};

export default Animations;
