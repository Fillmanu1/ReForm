import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mpSchema, type MP } from '../components/mpSchema';

// กำหนด Props ที่ Component นี้จะรับเข้ามา
interface MPFormProps {
  onSubmit: (data: MP) => void;
  // รับข้อมูลเริ่มต้น (สำหรับกรณีแก้ไข)
  initialData?: MP | null; 
}

export function MPForm({ onSubmit, initialData }: MPFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MP>({
    resolver: zodResolver(mpSchema),
    // ถ้ามี initialData (โหมดแก้ไข) ให้ใช้ค่านั้นเป็นค่าเริ่มต้น
    defaultValues: initialData || { 
      prefix: '',
      firstName: '',
      lastName: '',
      party: '',
      photoUrl: '',
      workHistory: '',
      achievements: '',
      ministerialPosition: '',
      ministry: ''
    },
  });

  const handleFormSubmit = (data: MP) => {
    onSubmit(data);
    reset(); // ล้างฟอร์มหลัง submit
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mp-form">
      <h2>{initialData ? 'แก้ไขข้อมูล ส.ส.' : 'เพิ่มรายชื่อ ส.ส.'}</h2>
      
      {/* คำนำหน้า */}
      <select {...register('prefix')}>
        <option value="">--เลือกคำนำหน้า--</option>
        <option value="นาย">นาย</option>
        <option value="นาง">นาง</option>
        <option value="นางสาว">นางสาว</option>
      </select>
      {errors.prefix && <p className="error-message">{errors.prefix.message}</p>}

      {/* ชื่อ-นามสกุล */}
      <input placeholder="ชื่อจริง" {...register('firstName')} />
      {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
      
      <input placeholder="นามสกุล" {...register('lastName')} />
      {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}

      {/* พรรคการเมือง */}
      <input placeholder="สังกัดพรรคการเมือง" {...register('party')} />
      {errors.party && <p className="error-message">{errors.party.message}</p>}

      {/* รูปภาพ */}
      <input placeholder="URL รูปภาพ (เช่น https:/../image.png)" {...register('photoUrl')} />
      {errors.photoUrl && <p className="error-message">{errors.photoUrl.message}</p>}

      {/* ประวัติและผลงาน */}
      <textarea placeholder="ประวัติการทำงาน" {...register('workHistory')} />
      <textarea placeholder="ผลงานที่ผ่านมา" {...register('achievements')} />
      
      {/* ตำแหน่งรัฐมนตรี */}
      <input placeholder="ตำแหน่งรัฐมนตรี (ถ้ามี)" {...register('ministerialPosition')} />
      <input placeholder="กระทรวง (ถ้ามี)" {...register('ministry')} />
      
      <button type="submit">{initialData ? 'บันทึกการแก้ไข' : 'เพิ่มรายชื่อ'}</button>
    </form>
  );
}