import { useState } from 'react';
import { MPForm } from './components/MPForm';
import { MPCard } from './components/MPCard';
import type { MP } from './components/mpSchema';
import './App.css'; // ไฟล์สำหรับตกแต่ง CSS

function App() {
  // State สำหรับเก็บรายชื่อ ส.ส. ทั้งหมด
  const [mps, setMps] = useState<MP[]>([]);
  // State สำหรับเก็บข้อมูล ส.ส. ที่กำลังจะแก้ไข
  const [editingMp, setEditingMp] = useState<MP | null>(null);

  const handleAddOrUpdateMP = (data: MP) => {
    // โหมดแก้ไข: ถ้ามีข้อมูลใน editingMp
    if (editingMp && editingMp.id) {
      setMps(mps.map(mp => (mp.id === editingMp.id ? { ...data, id: editingMp.id } : mp)));
      setEditingMp(null); // ออกจากโหมดแก้ไข
    } else {
      // โหมดเพิ่ม: สร้าง ID ใหม่ (ในแอปจริงควรใช้ library เช่น uuid)
      const newMp = { ...data, id: Date.now().toString() };
      setMps([...mps, newMp]);
    }
  };

  const handleDeleteMP = (id: string) => {
    if (window.confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      setMps(mps.filter(mp => mp.id !== id));
    }
  };

  const handleStartEdit = (mp: MP) => {
    setEditingMp(mp);
    // เลื่อนหน้าจอไปที่ฟอร์ม
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="app-container">
      <header>
        <h1>ทำเนียบสมาชิกสภาผู้แทนราษฎร</h1>
      </header>
      <main>
        <div className="form-section">
          <MPForm 
            key={editingMp ? editingMp.id : 'new'} // ใช้ key เพื่อ re-render ฟอร์มใหม่
            onSubmit={handleAddOrUpdateMP} 
            initialData={editingMp} 
          />
          {editingMp && (
            <button onClick={() => setEditingMp(null)} className="cancel-edit-btn">
              ยกเลิกการแก้ไข
            </button>
          )}
        </div>

        <div className="list-section">
          <h2>รายชื่อทั้งหมด</h2>
          {mps.length === 0 ? (
            <p>ยังไม่มีข้อมูล</p>
          ) : (
            <div className="mp-list">
              {mps.map((mp) => (
                <MPCard 
                  key={mp.id} 
                  mp={mp} 
                  onDelete={handleDeleteMP} 
                  onEdit={handleStartEdit} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;