import Button from "../Button";

function Modal({ isOpen, children, title, closeModal }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          {/* Modal */}
          <div className="bg-white rounded-lg p-6 w-[360px] sm:w-[600px] lg:w-[800px]">
            {/* Modal Content */}
            <div className="text-right">
              <Button
                type={"button"}
                onClick={closeModal}
                style={"close"}
                title={"Close"}
              />
            </div>
            <h2 className="text-3xl font-medium mb-4 text-center">{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
