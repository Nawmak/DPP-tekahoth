// 1. เก็บข้อมูลรายวิชาของแต่ละเทอม (จำลองข้อมูลเสมือนมาจาก Database)
const courseData = {
    "term-1-2026": [
        { code: "CS101", name: "Introduction to Computer Science", credits: 3, instructor: "ดร.สมชาย ใจดี" },
        { code: "MATH202", name: "Calculus II", credits: 3, instructor: "ศ.สมศรี มีสุข" },
        { code: "ENG101", name: "English for Academic Purposes", credits: 3, instructor: "Mrs. Jane Smith" }
    ],
    "term-2-2026": [
        { code: "CS102", name: "Object-Oriented Programming", credits: 3, instructor: "Dr. Terati" },
        { code: "DS201", name: "Data Structures and Algorithms", credits: 4, instructor: "Mr. Terati" },
        { code: "STAT101", name: "Statistics for Computer Science", credits: 3, instructor: "Dr. Terati" }
    ]
};

// ดึง Element จาก HTML มาเก็บไว้ในตัวแปร
const termSelect = document.getElementById('term-select');
const scheduleBody = document.getElementById('schedule-body');

// 2. ฟังก์ชันสำหรับอัปเดตตารางตามเทอมที่เลือก
function updateTable(termKey) {
    // ดึงข้อมูลวิชาตามเทอม ถ้าไม่มีให้เป็น array ว่าง
    const courses = courseData[termKey] || [];
    
    // เคลียร์ข้อมูลเก่าในตารางทิ้งก่อน
    scheduleBody.innerHTML = "";

    // วนลูปสร้างแถว (<tr>) ของแต่ละวิชา แล้วยัดใส่ตาราง
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td>${course.instructor}</td>  
        `;
        scheduleBody.appendChild(row);
    });
}

// 3. ดักจับเหตุการณ์ เมื่อมีการเปลี่ยนตัวเลือกใน Dropdown (<select>)
termSelect.addEventListener('change', function() {
    updateTable(this.value);
});

// 4. โหลดข้อมูลของเทอมแรกทันทีที่เปิดหน้าเว็บขึ้นมาครั้งแรก
window.addEventListener('DOMContentLoaded', () => {
    updateTable(termSelect.value);
});