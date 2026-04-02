'use client'

import { useEffect, useState } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: string
  lastLogin: string
}

interface Config {
  apiKey: string
  databaseUrl: string
  secretKey: string
  adminEmail: string
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching admin data
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'Administrator',
          lastLogin: '2025-04-02 10:30:45'
        },
        {
          id: 2,
          username: 'user1',
          email: 'user1@example.com',
          role: 'User',
          lastLogin: '2025-04-02 09:15:22'
        },
        {
          id: 3,
          username: 'user2',
          email: 'user2@example.com',
          role: 'User',
          lastLogin: '2025-04-01 16:45:33'
        }
      ])

      setConfig({
        apiKey: 'sk_test_51MxABCdefGHIjklMNOpqrsTUVwxyz',
        databaseUrl: 'postgresql://admin:password@db.example.com:5432/appdb',
        secretKey: 'EXAMPLE_SECRET_KEY_FOR_DEMO_ONLY',
        adminEmail: 'admin@example.com'
      })

      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ color: '#666' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px 10px 0 0',
            margin: '-2rem -2rem 2rem -2rem',
            marginBottom: '2rem'
          }}>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>
              🔐 Admin Panel
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              Protected administrative area - AUTHENTICATION BYPASSED via CVE-2025-29927
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '5px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              color: '#856404',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              ⚠️ Security Notice
            </h3>
            <p style={{
              color: '#856404',
              fontSize: '0.9rem',
              margin: '0.5rem 0 0 0'
            }}>
              This page demonstrates successful authentication bypass using CVE-2025-29927.
              In a real application, this would expose sensitive administrative functions and data.
            </p>
          </div>

          <h2 style={{
            color: '#333',
            marginBottom: '1rem',
            borderBottom: '2px solid #007bff',
            paddingBottom: '0.5rem'
          }}>
            User Management
          </h2>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '2rem',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#007bff',
                color: 'white'
              }}>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: '1px solid #0056b3'
                }}>
                  ID
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: '1px solid #0056b3'
                }}>
                  Username
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: '1px solid #0056b3'
                }}>
                  Email
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: '1px solid #0056b3'
                }}>
                  Role
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  border: '1px solid #0056b3'
                }}>
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #dee2e6'
                  }}>
                    {user.id}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #dee2e6',
                    fontWeight: user.role === 'Administrator' ? 'bold' : 'normal'
                  }}>
                    {user.username}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #dee2e6'
                  }}>
                    {user.email}
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #dee2e6'
                  }}>
                    <span style={{
                      backgroundColor: user.role === 'Administrator' ? '#dc3545' : '#28a745',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{
                    padding: '1rem',
                    border: '1px solid #dee2e6'
                  }}>
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{
            color: '#333',
            marginBottom: '1rem',
            borderBottom: '2px solid #dc3545',
            paddingBottom: '0.5rem'
          }}>
            🔑 Sensitive Configuration
          </h2>

          {config && (
            <div style={{
              backgroundColor: '#f8d7da',
              border: '1px solid #dc3545',
              borderRadius: '5px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: '#721c24',
                marginBottom: '1rem'
              }}>
                Leaked Configuration (via Authentication Bypass)
              </h3>
              <div style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: '1.8',
                color: '#333'
              }}>
                <div><strong>API Key:</strong> {config.apiKey}</div>
                <div><strong>Database URL:</strong> {config.databaseUrl}</div>
                <div><strong>Secret Key:</strong> {config.secretKey}</div>
                <div><strong>Admin Email:</strong> {config.adminEmail}</div>
              </div>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: '#e7f3ff',
              padding: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #007bff'
            }}>
              <h3 style={{
                color: '#004085',
                marginBottom: '0.5rem'
              }}>
                Total Users
              </h3>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                {users.length}
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff3cd',
              padding: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #ffc107'
            }}>
              <h3 style={{
                color: '#856404',
                marginBottom: '0.5rem'
              }}>
                Admin Users
              </h3>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ffc107'
              }}>
                {users.filter(u => u.role === 'Administrator').length}
              </div>
            </div>

            <div style={{
              backgroundColor: '#d4edda',
              padding: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #28a745'
            }}>
              <h3 style={{
                color: '#155724',
                marginBottom: '0.5rem'
              }}>
                Regular Users
              </h3>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#28a745'
              }}>
                {users.filter(u => u.role === 'User').length}
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>
              🛡️ Vulnerability Demonstrated
            </h3>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>
              This page was accessed WITHOUT authentication using CVE-2025-29927.
              In a real application, this would allow attackers to:
            </p>
            <ul style={{
              textAlign: 'left',
              marginTop: '1rem',
              marginBottom: 0
            }}>
              <li>View and modify all user accounts</li>
              <li>Access sensitive configuration data</li>
              <li>Exfiltrate secrets and API keys</li>
              <li>Perform administrative actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
