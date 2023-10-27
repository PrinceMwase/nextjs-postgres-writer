const ConfirmationModal = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-black">
        <p className="text-xl font-semibold capitalize">delete poem?</p>
        <p className="mb-4 text-sm md:text-normal">
          This can&apos;t be undone and It will be removed from this platform
          forever
        </p>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
