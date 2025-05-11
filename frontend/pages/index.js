// pages/index.js
import { useState } from 'react' 
import { useRouter } from 'next/router' 

export default function HomePage() { // หน้าแรกของแอปพลิเคชัน
  const [name, setName] = useState('')        // เก็บชื่อผู้ใช้จาก input
  const [password, setPassword] = useState('') // เก็บรหัสผ่าน 6 หลัก
  const [isRegister, setIsRegister] = useState(false) // true = สมัคร / false = ล็อกอิน
  const [error, setError] = useState('') // เก็บข้อความแสดงข้อผิดพลาด
  const router = useRouter() // ใช้สำหรับเปลี่ยนหน้า

  // ฟังก์ชันเรียกใช้ตอนผู้ใช้กดปุ่มสมัครหรือล็อกอิน
  const handleSubmit = async () => { // ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้กดปุ่ม
    if (!name || !password) { // ถ้าชื่อหรือรหัสผ่านว่าง
      setError('กรุณากรอกชื่อและรหัสผ่าน')
      return
    }
    if (!/^[0-9]{6}$/.test(password)) { // ถ้ารหัสผ่านไม่เป็นเลข 6 หลัก
      setError('รหัสผ่านต้องเป็นเลข 6 หลัก')
      return
    }

    const endpoint = isRegister ? '/signup' : '/login' // ถ้าเป็นการสมัครสมาชิกให้ใช้ /signup ถ้าเป็นการล็อกอินให้ใช้ /login

    try {
        const response = await fetch('https://humanedu.onrender.com/signup', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, // กำหนด Content-Type เป็น application/json
        body: JSON.stringify({ name, password }) // แปลงข้อมูลเป็น JSON
      });

      const data = await response.json();// แปลงข้อมูลที่ได้จาก API เป็น JSON

      if (!response.ok) { // ถ้าไม่สำเร็จ
        setError(data.detail || 'เกิดข้อผิดพลาด');
        return;
      }

      localStorage.setItem('studentName', name); // จำชื่อไว้ใน browser
      router.push('/lessons/l1'); // เปลี่ยนหน้าเมื่อสำเร็จ
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์'); // ถ้าเกิดข้อผิดพลาดในการเชื่อมต่อ
    }
  }
  
  return ( 
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900"> 
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">HumanEdu | เหมือนต่างกัน</h1> 
      <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 text-center max-w-xl">
        บทเรียนออนไลน์เพื่อความเท่าเทียมทางเพศและสิทธิมนุษยชน สนับสนุนเป้าหมายการพัฒนาอย่างยั่งยืนของสหประชาชาติ (SDGs)
      </p>
      
      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl w-full mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">🌍 SDGs ที่เกี่ยวข้อง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <div className="border-l-4 border-green-500 pl-3">
            <p className="font-bold">SDG 3: Good Health and Well-being</p>
            <p className="text-sm">สร้างหลักประกันการมีสุขภาวะที่ดี และส่งเสริมความเป็นอยู่ที่ดีสำหรับทุกคนในทุกช่วงวัย</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="font-bold">SDG 4: Quality Education</p>
            <p className="text-sm">สร้างหลักประกันว่าทุกคนมีการศึกษาที่มีคุณภาพอย่างครอบคลุมและเท่าเทียม และสนับสนุนโอกาสในการเรียนรู้ตลอดชีวิต</p>
          </div>
          <div className="border-l-4 border-pink-500 pl-3">
            <p className="font-bold">SDG 5: Gender Equality</p>
            <p className="text-sm">บรรลุความเสมอภาคระหว่างเพศ และเพิ่มบทบาทของสตรีและเด็กหญิงทุกคน</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-3">
            <p className="font-bold">SDG 10: Reduced Inequality</p>
            <p className="text-sm">ลดความไม่เสมอภาคภายในและระหว่างประเทศ</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-3">
            <p className="font-bold">SDG 16: Peace, Justice and Strong Institutions</p>
            <p className="text-sm">ส่งเสริมสังคมที่สงบสุขและครอบคลุม เพื่อการพัฒนาที่ยั่งยืน ให้ทุกคนเข้าถึงความยุติธรรม และสร้างสถาบันที่มีประสิทธิผล รับผิดชอบ และครอบคลุมในทุกระดับ</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-sm space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
        </h2>
        <input
          type="text"
          placeholder="ชื่อของคุณ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน 6 หลัก"
          value={password}
          maxLength={6}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
        </button>
        <p className="text-sm text-center text-blue-500">
          {isRegister ? 'มีบัญชีแล้ว? ' : 'ยังไม่มีบัญชี? '}
          <a href="#" onClick={() => { setIsRegister(!isRegister); setError('') }}>
            {isRegister ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </a>
        </p>
      </section>
    </main>
  )
}