// pages/lessons/l1.js
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Lesson1() {
  const router = useRouter()

  const goToQuiz = () => {
    router.push('/quizzes/q1')
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">บทเรียนที่ 1: ความหลากหลายของมนุษย์</h1>
      
      <p className="mb-4 text-gray-700">
        มนุษย์มีความหลากหลายในหลายด้าน เช่น เชื้อชาติ ศาสนา เพศ สถานภาพทางเศรษฐกิจ และอื่น ๆ
        การยอมรับความแตกต่างเหล่านี้จะช่วยให้เกิดสังคมที่เท่าเทียมและอยู่ร่วมกันอย่างสันติ
      </p>

      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-md"
          src="https://www.youtube.com/embed/VIDEO_ID_HERE"
          title="บทเรียน 1"
          allowFullScreen
        ></iframe>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Image
          src="/images/lesson1_1.jpg"
          alt="ตัวอย่างความหลากหลาย"
          width={600}
          height={400}
          className="rounded shadow"
        />
        <Image
          src="/images/lesson1_2.jpg"
          alt="การอยู่ร่วมกันอย่างสันติ"
          width={600}
          height={400}
          className="rounded shadow"
        />
      </div>

      <button
        onClick={goToQuiz}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
      >
        ไปทำแบบฝึกหัดบทที่ 1 ➡️
      </button>
    </main>
  )
}
