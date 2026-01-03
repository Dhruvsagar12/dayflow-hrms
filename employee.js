// COMPLETE employee.js WITH ATTENDANCE + LEAVE
let currentUser = {
    name: "Dhruv Sagar",
    phone: "+91 9876543210", 
    address: "Anand, Gujarat, India",
    profilePic: "https://via.placeholder.com/150?text=DS"
};

// ATTENDANCE STATE
let todayStatus = 'Not Checked In';
let checkInTime = null;
let checkOutTime = null;
let leaveRequests = [];

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Profile pic
    document.getElementById('profilePic').src = currentUser.profilePic;
    
    // File upload
    document.getElementById('picUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePic').src = e.target.result;
                alert('✅ Photo updated!');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Attendance status
    updateStatus();
    renderLeaveList();
});

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Edit toggle
function toggleEdit(field) {
    const input = document.getElementById(field);
    input.readOnly = false;
    input.focus();
}

// Save personal changes
function saveChanges(tabName) {
    if (tabName === 'personal') {
        currentUser.phone = document.getElementById('phone').value;
        currentUser.address = document.getElementById('address').value;
        alert('✅ Profile saved!');
    }
}

// ===== ATTENDANCE FUNCTIONS =====
function updateStatus() {
    document.getElementById('today-status').textContent = `Status: ${todayStatus}`;
    document.getElementById('attendance-log').textContent = 
        todayStatus === 'Checked Out' ? `In: ${checkInTime} | Out: ${checkOutTime}` :
        todayStatus === 'Checked In' ? `In: ${checkInTime}` : 'No records today';
}

function checkIn() {
    const now = new Date();
    checkInTime = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    todayStatus = 'Checked In';
    document.getElementById('checkin-btn').disabled = true;
    document.getElementById('checkout-btn').disabled = false;
    updateStatus();
    alert('✅ Checked In at ' + checkInTime);
}

function checkOut() {
    const now = new Date();
    checkOutTime = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    todayStatus = 'Checked Out';
    document.getElementById('checkout-btn').disabled = true;
    updateStatus();
    alert('✅ Checked Out at ' + checkOutTime);
}

// ===== LEAVE FUNCTIONS =====
function applyLeave() {
    const leave = {
        type: document.getElementById('leaveType').value,
        from: document.getElementById('leaveFrom').value,
        reason: document.getElementById('leaveReason').value,
        status: 'pending'
    };
    leaveRequests.push(leave);
    renderLeaveList();
    alert('✅ Leave request submitted!');
    document.getElementById('leaveReason').value = '';
}

function renderLeaveList() {
    const list = document.getElementById('leave-list');
    if (leaveRequests.length === 0) {
        list.innerHTML = '<p>No pending requests</p>';
        return;
    }
    list.innerHTML = leaveRequests.map(leave => `
        <div class="leave-item">
            <div>
                <strong>${leave.type}</strong> 
                <br>From: ${leave.from || 'N/A'}
                <br>${leave.reason}
            </div>
            <span class="leave-status status-pending">PENDING</span>
        </div>
    `).join('');
}
