import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchData(activeTab);
  }, [activeTab, navigate]);

  const fetchData = async (tab) => {
    setLoading(true);
    setError('');
    setData([]);
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/${tab}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const styles = {
    container: { padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    nav: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    tabBtn: (active) => ({
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      backgroundColor: active ? '#4f46e5' : '#e5e7eb',
      color: active ? 'white' : 'black',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold'
    }),
    logoutBtn: {
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold'
    },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    th: { backgroundColor: '#f3f4f6', padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e5e7eb' },
    td: { padding: '1rem', borderBottom: '1px solid #e5e7eb', verticalAlign: 'top' },
    noData: { textAlign: 'center', padding: '2rem', color: '#6b7280' }
  };

  const renderContacts = () => (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Company / Phone</th>
          <th style={styles.th}>Message</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td style={styles.td}>{new Date(item.createdAt).toLocaleString()}</td>
            <td style={styles.td}>{item.name}</td>
            <td style={styles.td}><a href={`mailto:${item.email}`}>{item.email}</a></td>
            <td style={styles.td}>
              {item.companyName && <div>🏢 {item.companyName}</div>}
              {item.contactNumber && <div>📞 {item.contactNumber}</div>}
            </td>
            <td style={styles.td}>{item.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCareers = () => (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email / Phone</th>
          <th style={styles.th}>Cover Letter</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td style={styles.td}>{new Date(item.createdAt).toLocaleString()}</td>
            <td style={styles.td}>{item.name}</td>
            <td style={styles.td}>
              <a href={`mailto:${item.email}`}>{item.email}</a>
              <br/>
              {item.phone && <span>📞 {item.phone}</span>}
            </td>
            <td style={styles.td}>{item.coverLetter || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderNewsletters = () => (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Date Subscribed</th>
          <th style={styles.th}>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td style={styles.td}>{new Date(item.createdAt).toLocaleString()}</td>
            <td style={styles.td}><a href={`mailto:${item.email}`}>{item.email}</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </header>

      <nav style={styles.nav}>
        <button style={styles.tabBtn(activeTab === 'contacts')} onClick={() => setActiveTab('contacts')}>
          Contact Submissions
        </button>
        <button style={styles.tabBtn(activeTab === 'careers')} onClick={() => setActiveTab('careers')}>
          Job Applications
        </button>
        <button style={styles.tabBtn(activeTab === 'newsletters')} onClick={() => setActiveTab('newsletters')}>
          Newsletter Subscribers
        </button>
      </nav>

      <main>
        {loading && <p>Loading data...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {!loading && !error && data.length === 0 && <p style={styles.noData}>No records found.</p>}
        
        {!loading && !error && data.length > 0 && (
          <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {activeTab === 'contacts' && renderContacts()}
            {activeTab === 'careers' && renderCareers()}
            {activeTab === 'newsletters' && renderNewsletters()}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
