import {type MP } from '../components/mpSchema';

interface MPCardProps {
  mp: MP;
  onDelete: (id: string) => void;
  onEdit: (mp: MP) => void;
}

export function MPCard({ mp, onDelete, onEdit }: MPCardProps) {
  return (
    <div className="mp-card">
      <img 
        src={mp.photoUrl || 'https://via.placeholder.com/150'} 
        alt={`${mp.firstName} ${mp.lastName}`} 
        className="mp-photo"
      />
      <div className="mp-info">
        <h3>{`${mp.prefix} ${mp.firstName} ${mp.lastName}`}</h3>
        <p><strong>พรรค:</strong> {mp.party}</p>
        {mp.ministerialPosition && (
          <p><strong>ตำแหน่ง:</strong> {`${mp.ministerialPosition} (${mp.ministry})`}</p>
        )}
        {mp.workHistory && <p><strong>ประวัติ:</strong> {mp.workHistory}</p>}
        {mp.achievements && <p><strong>ผลงาน:</strong> {mp.achievements}</p>}
      </div>
      <div className="mp-actions">
        <button onClick={() => onEdit(mp)} className="edit-btn">แก้ไข</button>
        {/* ตรวจสอบว่า mp.id มีค่าก่อนเรียกใช้ onDelete */}
        <button onClick={() => mp.id && onDelete(mp.id)} className="delete-btn">ลบ</button>
      </div>
    </div>
  );
}