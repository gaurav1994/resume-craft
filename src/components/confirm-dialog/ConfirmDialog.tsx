import { AlertTriangle, Trash2, X } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './ConfirmDialog.module.css'

type ConfirmDialogProps = Readonly<{
  confirmMessage: ReactNode
  onConfirm: () => void
  onCancel: () => void
  title?: string
  confirmLabel?: string
  cancelLabel?: string
}>

function ConfirmDialog({
  confirmMessage,
  onConfirm,
  onCancel,
  title = 'Delete this resume?',
  confirmLabel = 'Delete resume',
  cancelLabel = 'Keep resume',
}: ConfirmDialogProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message">
        <div className={styles.icon}><AlertTriangle size={23} aria-hidden="true" /></div>
        <button className="absolute right-5 top-5 rounded-md p-1 text-[#8b9892] hover:bg-[#f1f5f1] hover:text-[#18232b]" type="button" aria-label="Close confirmation" onClick={onCancel}><X size={18} /></button>
        <h2 className={styles.heading} id="confirm-dialog-title">{title}</h2>
        <div className={styles.message} id="confirm-dialog-message">{confirmMessage}</div>
        <div className={styles.actions}>
          <button className={styles.cancel} type="button" onClick={onCancel}>{cancelLabel}</button>
          <button className={styles.confirm} type="button" onClick={onConfirm}><Trash2 size={15} aria-hidden="true" /> {confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
