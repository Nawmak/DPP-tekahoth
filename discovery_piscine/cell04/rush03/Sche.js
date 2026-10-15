// --- แบ่งข้อมูลคณะออกเป็น 2 ฝั่ง (group1 และ group2) ---
const group1Data = {
    "eng": {
        name: "คณะวิศวกรรมศาสตร์",
        major: "สาขาวิชาวิศวกรรมคอมพิวเตอร์",
        curriculum: "หลักสูตรวิศวกรรมศาสตรบัณฑิต (วศ.บ.) เน้นการพัฒนาซอฟต์แวร์, ปัญญาประดิษฐ์ (AI), และระบบเครือข่ายคอมพิวเตอร์",
        courses: [
            { code: "EGCO101", name: "Introduction to Computer Engineering", credits: "3(3-0-6)" },
            { code: "EGCO111", name: "Computer Programming", credits: "3(2-2-5)" },
            { code: "EGCO202", name: "Data Structures and Algorithms", credits: "3(3-0-6)" }
        ]
    },
    "it": {
        name: "คณะเทคโนโลยีสารสนเทศ",
        major: "สาขาวิชาเทคโนโลยีสารสนเทศ",
        curriculum: "หลักสูตรวิทยาศาสตรบัณฑิต (วท.บ.) เน้นการจัดการฐานข้อมูล, ความปลอดภัยไซเบอร์, และการพัฒนาเว็บแอปพลิเคชัน",
        courses: [
            { code: "IT101", name: "Information Technology Fundamentals", credits: "3(3-0-6)" },
            { code: "IT102", name: "Web Application Development", credits: "3(2-2-5)" }
        ]
    }
};

const group2Data = {
    "ba": {
        name: "คณะบริหารธุรกิจ",
        major: "สาขาวิชาการตลาดดิจิทัล",
        curriculum: "หลักสูตรบริหารธุรกิจบัณฑิต (บธ.บ.) เน้นกลยุทธ์การตลาดออนไลน์, การวิเคราะห์พฤติกรรมผู้บริโภค และ E-Commerce",
        courses: [
            { code: "BA101", name: "Principles of Marketing", credits: "3(3-0-6)" },
            { code: "BA102", name: "Digital Marketing Strategy", credits: "3(3-0-6)" }
        ]
    },
    "arts": {
        name: "คณะมนุษยศาสตร์",
        major: "สาขาวิชาภาษาอังกฤษเพื่อการสื่อสสารสากล",
        curriculum: "หลักสูตรศิลปศาสตรบัณฑิต (ศศ.บ.) เน้นทักษะการฟัง พูด อ่าน เขียน ภาษาอังกฤษระดับสูงและการสื่อสารธุรกิจระหว่างประเทศ",
        courses: [
            { code: "EN101", name: "Advanced English Communication", credits: "3(3-0-6)" },
            { code: "EN102", name: "Cross-Cultural Communication", credits: "3(3-0-6)" }
        ]
    }
};

// ฟังก์ชันสร้างปุ่มเลือกคณะทั้ง 2 ฝั่งอัตโนมัติ
function renderFacultyLists() {
    // ฝั่งที่ 1
    const list1 = document.getElementById('facultyList1');
    list1.innerHTML = '';
    for (const key in group1Data) {
        const faculty = group1Data[key];
        const btn = document.createElement('button');
        btn.className = 'faculty-btn';
        btn.innerText = faculty.name;
        btn.onclick = () => selectFaculty(key, group1Data, btn);
        list1.appendChild(btn);
    }

    // ฝั่งที่ 2
    const list2 = document.getElementById('facultyList2');
    list2.innerHTML = '';
    for (const key in group2Data) {
        const faculty = group2Data[key];
        const btn = document.createElement('button');
        btn.className = 'faculty-btn';
        btn.innerText = faculty.name;
        btn.onclick = () => selectFaculty(key, group2Data, btn);
        list2.appendChild(btn);
    }
}

// ฟังก์ชันเมื่อคลิกเลือกคณะ (จะล้างสถานะ active ทุกปุ่ม แล้วแสดงรายละเอียดด้านล่าง)
function selectFaculty(key, dataSource, buttonElement) {
    // ลบสถานะ active จากทุกปุ่มในหน้าจอ
    document.querySelectorAll('.faculty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // ใส่ active เฉพาะปุ่มที่ถูกคลิก
    buttonElement.classList.add('active');

    const data = dataSource[key];
    const panel = document.getElementById('contentPanel');

    // สร้างตารางรายวิชา
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

    // แสดงผลข้อมูลในแผงด้านล่าง
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

// เริ่มต้นโหลดรายการคณะเมื่อเปิดหน้าเว็บ
renderFacultyLists();