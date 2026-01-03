// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHie46yrJ6JwBLghP3ASOgUMvJLDUKdrg",
  authDomain: "dayflow-hrms-f99ba.firebaseapp.com",
  projectId: "dayflow-hrms-f99ba",
  storageBucket: "dayflow-hrms-f99ba.appspot.com", // corrected domain
  messagingSenderId: "643625909374",
  appId: "1:643625909374:web:e32e6646845eaa1a292c2f"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
async function login(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection('employees').doc(userCredential.user.uid).get();
    const role = userDoc.data()?.role || 'employee';
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'employee.html';
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

// Signup function
async function signup(employeeId, email, password, role = 'employee') {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('employees').doc(userCredential.user.uid).set({
      employee_id: employeeId,
      email: email,
      role: role,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Account created! Please login.');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Signup failed: ' + error.message);
  }
}

// Get current user data
async function getCurrentUser() {
  const user = auth.currentUser;
  if (!user) return null;
  const userDoc = await db.collection('employees').doc(user.uid).get();
  return userDoc.data();
}
