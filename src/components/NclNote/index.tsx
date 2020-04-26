import React, { useState } from 'react';
import DialogWithOverlay from '../NclDialog';
import Markdown from '../Markdown';

interface NoteInterface { 
  globalNotes: string,
  placeholderText?: string,
  headerText?: string,
  mobileText?: string,
  tabletText?: string,
  cancelText?: string,
  saveText?: string,
  saveGlobalNotes: (localNote: string) => any
}

const Note: React.FC<NoteInterface> = ({
  globalNotes,
  headerText,
  placeholderText = '',
  mobileText,
  tabletText,
  cancelText,
  saveText = 'save',
  saveGlobalNotes,
}) => {
  const [isDialogOn, setIsDialogOn] = useState<boolean>(false);
  const [localNotes, setLocalNotes] = useState<string>('');
  const [hasLocalNotesChanged, setHasLocalNotesChanged] = useState<boolean>(false);
  
  const handleCancel = () => {
    setLocalNotes('');
    setIsDialogOn(false);
  };
  const handleSave = () => {
    saveGlobalNotes(localNotes);
    setIsDialogOn(false);
  }

  const notesToDisplay = hasLocalNotesChanged 
    ? localNotes
    : (localNotes || globalNotes)

  return (
    <>
      <button 
        onClick={() => { 
          setIsDialogOn(true);
          setHasLocalNotesChanged(false);
        }}
        key="button"
        type="button"
        id="view-notes-button"
      />

      <DialogWithOverlay
        isModalOn={isDialogOn}
        extraClass="note-dialog"
        clickHandler={() => { setIsDialogOn(false); }}
      >
        <div className="note-dialog-intro">
          { headerText && <h1>{headerText}</h1> }
          {
            mobileText && (
              <Markdown
                extraClass="mobile"
                text={mobileText}
              />
              )
            }
          {
            tabletText && (
              <Markdown
                extraClass="tablet"
                text={tabletText}
              />
            )
          }
        </div>

        <div className="note-dialog-textarea">
          {
            notesToDisplay === '' && (
              <div className="placeholder" aria-hidden>
                <Markdown text={placeholderText} />
              </div>
            )
          }
          <textarea
            id="textarea"
            value={notesToDisplay}
            onChange={e => { 
              setHasLocalNotesChanged(true);
              setLocalNotes(e.target.value);
            }}
            placeholder={placeholderText}
          />
        </div>
          
        <div className="note-dialog-buttons">
          {
            cancelText ? (
              <button className="cancel" onClick={handleCancel} key="cancel" type="button">
                « {cancelText}
              </button>
            ) : <div />
          }
          <button className="save" onClick={handleSave} key="save" type="button">
            {saveText} »
          </button>
        </div>
      </DialogWithOverlay>
    </>
  );
}

export default Note;