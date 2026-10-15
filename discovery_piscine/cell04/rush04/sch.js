// --- DATABASE: ฐานข้อมูลรายชื่อคณะ สาขา หลักสูตร และรายวิชา ---
// คุณสามารถเพิ่มข้อมูลคณะอื่นๆ ต่อท้ายในนี้ได้เลยครับ
const facultyDatabase = {
    "eng": {
        name: "คณะวิศวกรรมศาสตร์",
        major: "สาขาวิชาวิศวกรรมคอมพิวเตอร์",
        curriculum: "หลักสูตรวิศวกรรมศาสตรบัณฑิต (วศ.บ.) เน้นการศึกษาด้านการพัฒนาซอฟต์แวร์, ระบบปัญญาประดิษฐ์ (AI), และโครงสร้างฮาร์ดแวร์-ซอฟต์แวร์",
        courses: [
            { code: "EGCO101", name: "Introduction to Computer Engineering", credits: "3(3-0-6)" },
            { code: "EGCO111", name: "Computer Programming", credits: "3(2-2-5)" },
            { code: "EGCO202", name: "Data Structures and Algorithms", credits: "3(3-0-6)" }
        ]
    },
    "it": {
        name: "คณะเทคโนโลยีสารสนเทศ",
        major: "สาขาวิชาเทคโนโลยีสารสนเทศ",
        curriculum: "หลักสูตรวิทยาศาสตรบัณฑิต (วท.บ.) เน้นการจัดการระบบฐานข้อมูล, ความปลอดภัยทางไซเบอร์, และการพัฒนาเว็บ/แอปพลิเคชัน",
        courses: [
            { code: "IT101", name: "Information Technology Fundamentals", credits: "3(3-0-6)" },
            { code: "IT102", name: "Web Application Development", credits: "3(2-2-5)" },
            { code: "IT203", name: "Database Systems", credits: "3(3-0-6)" }
        ]
    },
    "ba": {
        name: "คณะบริหารธุรกิจ",
        major: "สาขาวิชาการตลาดดิจิทัล",
        curriculum: "หลักสูตรบริหารธุรกิจบัณฑิต (บธ.บ.) เน้นกลยุทธ์การตลาดออนไลน์, การวิเคราะห์พฤติกรรมผู้บริโภคด้วยข้อมูล และ E-Commerce",
        courses: [
            { code: "BA101", name: "Principles of Marketing", credits: "3(3-0-6)" },
            { code: "BA102", name: "Digital Marketing Strategy", credits: "3(3-0-6)" },
            { code: "BA201", name: "Consumer Behavior", credits: "3(3-0-6)" }
        ]
    },
    "arts": {
        name: "คณะมนุษยศาสตร์",
        major: "สาขาวิชาภาษาอังกฤษเพื่อการสื่อสารสากล",
        curriculum: "หลักสูตรศิลปศาสตรบัณฑิต (ศศ.บ.) เน้นทักษะการฟัง พูด อ่าน เขียนภาษาอังกฤษระดับสูง และการสื่อสารธุรกิจระหว่างประเทศ",
        courses: [
            { code: "EN101", name: "Advanced English Communication", credits: "3(3-0-6)" },
            { code: "EN102", name: "Cross-Cultural Communication", credits: "3(3-0-6)" },
            { code: "EN201", name: "English for Business", credits: "3(3-0-6)" }
        ]
    }
};

// ฟังก์ชันเติมตัวเลือกคณะลงใน Dropdown ของทั้ง 2 ฝั่งเมื่อโหลดหน้าเว็บ
function initDropdowns() {
    const select1 = document.getElementById('facultySelect1');
    const select2 = document.getElementById('facultySelect2');

    for (const key in facultyDatabase) {
        const faculty = facultyDatabase[key];
        
        // เพิ่มตัวเลือกให้ฝั่งที่ 1
        const option1 = document.createElement('option');
        option1.value = key;
        option1.text = faculty.name + " (" + faculty.major + ")";
        select1.appendChild(option1);

        // เพิ่มตัวเลือกให้ฝั่งที่ 2
        const option2 = document.createElement('option');
        option2.value = key;
        option2.text = faculty.name + " (" + faculty.major + ")";
        select2.appendChild(option2);
    }
}

// ฟังก์ชันโหลดข้อมูลและแสดงผลแยกตามฝั่ง (side = 1 ฝั่งซ้าย, side = 2 ฝั่งขวา)
function loadFacultyData(side) {
    const selectElement = document.getElementById(`facultySelect${side}`);
    const panelElement = document.getElementById(`contentPanel${side}`);
    const selectedKey = selectElement.value;

    // ถ้ายังไม่ได้เลือกคณะ (เลือกหัวข้อเริ่มต้น)
    if (!selectedKey) {
        panelElement.innerHTML = `<div class="placeholder-text">ยังไม่ได้เลือกคณะฝั่ง${side === 1 ? 'ซ้าย' : 'ขวา'}</div>`;
        return;
    }

    const data = facultyDatabase[selectedKey];

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

    // แสดงผลข้อมูลในแผงของฝั่งนั้นๆ
    panelElement.innerHTML = `
        <div class="faculty-details">
            <h3>${data.name}</h3>
            <div class="major-name">${data.major}</div>
            
            <div class="section-title">📖 ข้อมูลหลักสูตร</div>
            <div class="curriculum-info">${data.curriculum}</div>

            <div class="section-title">📋 รายวิชาที่เรียน</div>
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

// เริ่มต้นทำงานเมื่อเปิดหน้าเว็บ
initDropdowns();