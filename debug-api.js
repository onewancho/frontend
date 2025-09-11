// Debug script untuk test API create user dan product
// Jalankan di browser console untuk test manual

async function testAPIConnection() {
  const token = localStorage.getItem('auth_token')
  console.log('🔑 Token:', token ? 'Available' : 'Missing')
  
  if (!token) {
    console.log('⚠️ No token found. Please login first.')
    return
  }
  
  try {
    // Test auth endpoint
    console.log('🧪 Testing auth endpoint...')
    const authResponse = await fetch('https://backend-ravayahijab.up.railway.app/api/auth/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    console.log('👤 Auth status:', authResponse.status)
    const authData = await authResponse.text()
    console.log('👤 Auth response:', authData)
    
  } catch (error) {
    console.error('❌ API test error:', error)
  }
}

async function testCreateUser() {
  const token = localStorage.getItem('auth_token')
  
  const testUserData = {
    name: 'Test User Debug',
    email: 'testuser@example.com',
    password: 'TestPassword123',
    password_confirmation: 'TestPassword123',
    role: 'user'
  }
  
  console.log('🧪 Testing create user...')
  console.log('📋 User data:', { ...testUserData, password: '[HIDDEN]' })
  
  try {
    const response = await fetch('https://backend-ravayahijab.up.railway.app/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(testUserData)
    })
    
    console.log('📊 Response status:', response.status)
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('📊 Response body:', responseText)
    
    try {
      const jsonData = JSON.parse(responseText)
      console.log('📊 Parsed JSON:', jsonData)
    } catch (e) {
      console.log('⚠️ Response is not JSON')
    }
    
  } catch (error) {
    console.error('❌ Create user test error:', error)
  }
}

async function testRegister() {
  const testRegisterData = {
    name: 'New User Test',
    email: 'newuser@example.com',
    password: 'NewPassword123',
    password_confirmation: 'NewPassword123'
  }
  
  console.log('🧪 Testing register...')
  console.log('📋 Register data:', { ...testRegisterData, password: '[HIDDEN]' })
  
  try {
    const response = await fetch('https://backend-ravayahijab.up.railway.app/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(testRegisterData)
    })
    
    console.log('📊 Register status:', response.status)
    const responseText = await response.text()
    console.log('📊 Register response:', responseText)
    
  } catch (error) {
    console.error('❌ Register test error:', error)
  }
}

// Export functions for browser console
window.testAPIConnection = testAPIConnection
window.testCreateUser = testCreateUser
window.testRegister = testRegister

console.log('🚀 Debug functions available:')
console.log('- testAPIConnection() - Test basic API connectivity')
console.log('- testCreateUser() - Test admin user creation')
console.log('- testRegister() - Test user registration')
