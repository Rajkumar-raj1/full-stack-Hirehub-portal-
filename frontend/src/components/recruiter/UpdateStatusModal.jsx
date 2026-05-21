import Modal from "../common/Modal.jsx";

const UpdateStatusModal = ({
  isOpen,
  onClose,
  onUpdate,
  selectedStatus,
  setSelectedStatus,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div>
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Update Application Status
        </h2>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <option value="pending">
            Pending
          </option>

          <option value="accepted">
            Accepted
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onUpdate}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;