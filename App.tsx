import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

// Mock student data
const mockStudentData = {
  'student@college.edu': {
    id: '1',
    name: 'Alex Johnson',
    email: 'student@college.edu',
    class: 'Computer Science - Section A',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    feesBalance: 15000,
    totalFees: 50000,
    paidFees: 35000,
    semester: 'Fall 2025'
  },
  'sarah.williams@college.edu': {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@college.edu',
    class: 'Business Administration - Section B',
    department: 'School of Business',
    year: '2nd Year',
    feesBalance: 8500,
    totalFees: 45000,
    paidFees: 36500,
    semester: 'Fall 2025'
  },
  'mike.chen@college.edu': {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@college.edu',
    class: 'Mechanical Engineering - Section C',
    department: 'Engineering',
    year: '4th Year',
    feesBalance: 0,
    totalFees: 52000,
    paidFees: 52000,
    semester: 'Fall 2025'
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  const handleLogin = (email: string) => {
    // Simulate authentication
    const student = mockStudentData[email as keyof typeof mockStudentData];
    if (student) {
      setCurrentStudent(student);
      setIsLoggedIn(true);
      return { success: true };
    } else {
      return { success: false, message: 'Student email not found. Try: student@college.edu' };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentStudent(null);
  };

  const handlePayment = (amount: number) => {
    // Update student balance
    setCurrentStudent((prev: any) => ({
      ...prev,
      feesBalance: prev.feesBalance - amount,
      paidFees: prev.paidFees + amount
    }));
  };

  return (
    <div className="min-h-screen">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard 
          student={currentStudent} 
          onLogout={handleLogout}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
}
