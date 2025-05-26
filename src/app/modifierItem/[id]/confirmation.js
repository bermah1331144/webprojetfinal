export default function ConfirmationModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <>
      {/* Le backdrop (fond sombre transparent) */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

      {/* La boîte modale blanche */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }} // au-dessus du backdrop
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ backgroundColor: "#fff" }}>
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>
                Annuler
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
