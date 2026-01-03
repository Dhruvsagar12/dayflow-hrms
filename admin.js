// Sample employees data
let employees = {
    emp1: { name: "Dhruv Sagar", phone: "+91 9876543210", email: "dhruv@example.com", address: "Anand, Gujarat", empId: "EMP001", dept: "Computer Engineering", joinDate: "2025-08-01", role: "Hackathon Developer", basic: 25000, hra: 7500, allowance: 5000, total: 37500, pic: "https://via.placeholder.com/150?text=DS" },
    emp2: { name: "Rahul Patel", phone: "+91 9876543211", email: "rahul@example.com", address: "Vadodara, Gujarat", empId: "EMP002", dept: "Mechanical Engineering", joinDate: "2025-07-15", role: "Engineer", basic: 28000, hra: 8400, allowance: 6000, total: 42400, pic: "https://via.placeholder.com/150?text=RP" },
    emp3: { name: "Priya Sharma", phone: "+91 9876543212", email: "priya@example.com", address: "Ahmedabad, Gujarat", empId: "EMP003", dept: "HR", joinDate: "2025-09-01", role: "HR Executive", basic: 22000, hra: 6600, allowance: 4000, total: 32600, pic: "https://via.placeholder.com/150?text=PS" }
};

let currentEmp = 'emp1';

// Tab switching (same as employee)
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('admin-' + tabName).classList.add('active');
    event.target.classList.add('active');
}

// Load selected employee
function loadEmployee() {
    const empId = document.getElementById('employeeSelect').value;
    if (empId && employees[empId]) {
        currentEmp = empId;
        const emp = employees[empId];
        document.getElementById('adminProfilePic').src = emp.pic;
        document.getElementById('adminEmpName').value = emp.name;
        document.getElementById('adminPhone').value = emp.phone;
        document.getElementById('adminEmail').value = emp.email;
        document.getElementById('adminAddress').value = emp.address;
        document.getElementById('adminEmpId').value = emp.empId;
        document.getElementById('adminDept').value = emp.dept;
        document.getElementById('adminJoinDate').value = emp.joinDate;
        document.getElementById('adminRole').value = emp.role;
        document.getElementById('adminBasic').value = emp.basic;
        document.getElementById('adminHRA').value = emp.hra;
        document.getElementById('adminAllowance').value = emp.allowance;
        document.getElementById('adminTotal').value = emp.total;
    }
}

// Calculate salary
function calculateSalary() {
    const basic = parseFloat(document.getElementById('adminBasic').value) || 0;
    const hra = parseFloat(document.getElementById('adminHRA').value) || 0;
    const allowance = parseFloat(document.getElementById('adminAllowance').value) || 0;
    document.getElementById('adminTotal').value = basic + hra + allowance;
}

// Save admin changes
function saveAdminChanges(tab) {
    const emp = employees[currentEmp];
    if (tab === 'personal') {
        emp.name = document.getElementById('adminEmpName').value;
        emp.phone = document.getElementById('adminPhone').value;
        emp.email = document.getElementById('adminEmail').value;
        emp.address = document.getElementById('adminAddress').value;
    } else if (tab === 'job') {
        emp.empId = document.getElementById('adminEmpId').value;
        emp.dept = document.getElementById('adminDept').value;
        emp.joinDate = document.getElementById('adminJoinDate').value;
        emp.role = document.getElementById('adminRole').value;
    } else if (tab === 'salary') {
        emp.basic = parseFloat(document.getElementById('adminBasic').value);
        emp.hra = parseFloat(document.getElementById('adminHRA').value);
        emp.allowance = parseFloat(document.getElementById('adminAllowance').value);
        emp.total = parseFloat(document.getElementById('adminTotal').value);
    }
    alert('✅ ' + emp.name + ' details updated!');
    // Save to Firebase here
}

// Profile pic upload
document.getElementById('adminPicUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('adminProfilePic').src = e.target.result;
            employees[currentEmp].pic = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Download docs
function downloadDoc(type) {
    alert('📥 Downloading ' + type.toUpperCase() + ' Card...');
}

// Load first employee
loadEmployee();
