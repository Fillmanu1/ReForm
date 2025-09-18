import { z } from 'zod';

// กำหนด Schema สำหรับข้อมูล ส.ส.
export const mpSchema = z.object({
  // เพิ่ม id เพื่อใช้ในการ ลบ/แก้ไข ในภายหลัง
  id: z.string().optional(), 
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้าชื่อ'),
  firstName: z.string().min(2, 'ชื่อจริงต้องมีอย่างน้อย 2 ตัวอักษร'),
  lastName: z.string().min(2, 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),
  party: z.string().min(1, 'กรุณาระบุพรรคการเมือง'),
  // รูปภาพจะเก็บเป็น URL ของรูปภาพ
  photoUrl: z.string().url('กรุณาใส่ URL ของรูปภาพให้ถูกต้อง').or(z.literal('')),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerialPosition: z.string().optional(),
  ministry: z.string().optional(),
});

// สร้าง Type จาก Schema เพื่อนำไปใช้ใน Component
export type MP = z.infer<typeof mpSchema>;