import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export default function Modal(props: Props) {
  const { children, isOpened, onClose } = props;

  return (
    <dialog
      className={`modal ${isOpened ? "modal-open" : ""}`}
      onClose={() => console.log("close")}
    >
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
