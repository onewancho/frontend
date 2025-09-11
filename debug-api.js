// Debug script untuk test API create product
// Jalankan di browser console untuk test manual

async function testCreateProduct() {
  const token = localStorage.getItem('auth_token')
  console.log('🔑 Token:', token ? 'Available' : 'Missing')
  
  const testData = {
    name: 'Test Product Debug',
    description: 'Test description',
    price: 100000,
    stock: 10,
    category_id: 1,
    status: 'active'
  }
  
  console.log('📋 Test data:', testData)
  
  try {
    const response = await fetch('https://backend-ravayahijab.up.railway.app/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(testData)
    })
    
    console.log('📊 Response status:', response.status)
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))
    
    const responseData = await response.text()
    console.log('📊 Response body:', responseData)
    
    try {
      const jsonData = JSON.parse(responseData)
      console.log('📊 Parsed JSON:', jsonData)
    } catch (e) {
      console.log('⚠️ Response is not JSON')
    }
    
  } catch (error) {
    console.error('❌ Fetch error:', error)
  }
}

// Jalankan test
console.log('🧪 Starting API test...')
testCreateProduct()
