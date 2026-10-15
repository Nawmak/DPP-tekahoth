// --- ส่วนสำหรับใส่ข้อมูลแต่ละคณะ (คุณสามารถแก้ไข เพิ่ม หรือลบข้อมูลตรงนี้ได้เลย) ---
const facultyData = {
    "eng": {
        name: "คณะวิศวกรรมศาสตร์",
        major: "สาขาวิชาวิศวกรรมคอมพิวเตอร์",
        curriculum: "หลักสูตรวิศวกรรมศาสตรบัณฑิต (วศ.บ.) เน้นการศึกษาด้านการพัฒนาซอฟต์แวร์, ระบบปัญญาประดิษฐ์ (AI), และโครงสร้างพื้นฐานทางคอมพิวเตอร์",
        courses: [
            { code: "EGCO101", name: "Introduction to Computer Engineering", credits: "3(3-0-6)" },
            { code: "EGCO111", name: "Computer Programming", credits: "3(2-2-5)" },
            { code: "EGCO202", name: "Data Structures and Algorithms", credits: "3(3-0-6)" },
            { code: "EGCO212", name: "Object-Oriented Programming", credits: "3(2-2-5)" }
        ]
    },
    "it": {
        name: "คณะเทคโนโลยีสารสนเทศ",
        major: "สาขาวิชาเทคโนโลยีสารสนเทศ",
        curriculum: "หลักสูตรวิทยาศาสตรบัณฑิต (วท.บ.) เน้นการจัดการระบบฐานข้อมูล, ความปลอดภัยทางไซเบอร์, และการพัฒนาเว็บหรือแอปพลิเคชันสมัยใหม่",
        courses: [
            { code: "IT101", name: "Information Technology Fundamentals", credits: "3(3-0-6)" },
            { code: "IT102", name: "Web Application Development", credits: "3(2-2-5)" },
            { code: "IT203", name: "Database Systems", credits: "3(3-0-6)" },
            { code: "IT301", name: "Network Security and Administration", credits: "3(3-0-6)" }
        ]
    },
    "ba": {
        name: "คณะบริหารธุรกิจ",
        major: "สาขาวิชาการตลาดดิจิทัล",
        curriculum: "หลักสูตรบริหารธุรกิจบัณฑิต (บธ.บ.) เน้นกลยุทธ์การตลาดออนไลน์, การวิเคราะห์พฤติกรรมผู้บริโภคด้วยข้อมูล, และการบริหารธุรกิจอีคอมเมิร์ซ",
        courses: [
            { code: "BA101", name: "Principles of Marketing", credits: "3(3-0-6)" },
            { code: "BA102", name: "Digital Marketing Strategy", credits: "3(3-0-6)" },
            { code: "BA201", name: "Consumer Behavior", credits: "3(3-0-6)" },
            { code: "BA205", name: "Social Media and Content Creation", credits: "3(2-2-5)" }
        ]
    }
    // หากต้องการเพิ่มคณะอื่นๆ สามารถเพิ่มรูปแบบด้านบนต่อท้ายตรงนี้ได้เลย
};

// ฟังก์ชันสร้างรายการปุ่มคณะทางฝั่งซ้ายอัตโนมัติ
function renderFacultyList() {
    const listContainer = document.getElementById('facultyList');
    listContainer.innerHTML = '';

    for (const key in facultyData) {
        const faculty = facultyData[key];
        const btn = document.createElement('button');
        btn.className = 'faculty-btn';
        btn.innerText = faculty.name;
        btn.onclick = () => selectFaculty(key, btn);
        listContainer.appendChild(btn);
    }
}

// ฟังก์ชันเมื่อคลิกเลือกคณะ เพื่อแสดงรายละเอียดและตารางรายวิชาทางฝั่งขวา
function selectFaculty(key, buttonElement) {
    // ลบสถานะ active จากปุ่มทั้งหมด แล้วเพิ่มให้ปุ่มที่ถูกคลิก
    document.querySelectorAll('.faculty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    buttonElement.classList.add('active');

    const data = facultyData[key];
    const panel = document.getElementById('contentPanel');

    // วนลูปสร้างแถวตารางรายวิชา
    let coursesHTML = '';
    data.courses.forEach(course => {
        coursesHTML += `
            <tr>
                <td><strong>${course.code}</strong></td>
                <td>${course.name}</td>
                <td>${course.credits}</td>
            </tr>
        `;
    });

    // แสดงผลข้อมูลทั้งหมดในแผงฝั่งขวา
    panel.innerHTML = `
        <div class="faculty-details">
            <h2>${data.name}</h2>
            <div class="major-name">${data.major}</div>
            
            <div class="section-title">📖 ข้อมูลหลักสูตร</div>
            <div class="curriculum-info">${data.curriculum}</div>

            <div class="section-title">📋 รายวิชาที่เรียนในหลักสูตร</div>
            <div class="course-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อรายวิชา</th>
                            <th>หน่วยกิต</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${coursesHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// เรียกใช้งานฟังก์ชันสร้างเมนูเริ่มต้นเมื่อโหลดหน้าเว็บ
renderFacultyList();