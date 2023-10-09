import React from "react";



function ConfirmDeleteDialog({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) {
      return null;
    }
  
    return (
  <div className="dialog-backdrop">
  <div className="confirm-dialog">
        <p>Are you sure you want to delete this item?</p>
        <div className="deletebuttons">
        <button 
        id="cancelbutton"
        
        onClick={onCancel}>Cancel</button>
        <button 
        id="confirmbutton"
        onClick={onConfirm}>Confirm</button>
        </div>
       
      </div>
        </div>
      
    );
  }
  
  export default ConfirmDeleteDialog;