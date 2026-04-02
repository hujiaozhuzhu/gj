import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '1rem'
        }}>
          CVE-2025-29927 Test Environment
        </h1>

        <p style={{
          color: '#666',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Welcome to the Next.js authorization bypass vulnerability test environment.
          This application is deliberately vulnerable to CVE-2025-29927 for educational purposes.
        </p>

        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '5px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            color: '#856404',
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            ⚠️ Security Warning
          </h2>
          <p style={{
            color: '#856404',
            fontSize: '0.9rem'
          }}>
            This environment contains a known security vulnerability and should only be used
            for authorized security testing and educational purposes.
          </p>
        </div>

        <h2 style={{
          color: '#333',
          marginBottom: '1rem'
        }}>
          Test Scenarios
        </h2>

        <div style={{
          display: 'grid',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <TestLink
            title="Admin Panel (Protected)"
            description="Try to access without authentication"
            path="/admin"
            status="Protected"
          />

          <TestLink
            title="API Config (Protected)"
            description="Sensitive configuration endpoint"
            path="/api/config"
            status="Protected"
          />

          <TestLink
            title="Dashboard (Protected)"
            description="User dashboard area"
            path="/dashboard"
            status="Protected"
          />

          <TestLink
            title="Home Page (Public)"
            description="Publicly accessible page"
            path="/"
            status="Public"
          />
        </div>

        <div style={{
          backgroundColor: '#d1ecf1',
          border: '1px solid #17a2b8',
          borderRadius: '5px',
          padding: '1rem'
        }}>
          <h3 style={{
            color: '#0c5460',
            marginBottom: '0.5rem'
          }}>
            🧪 How to Test
          </h3>
          <ol style={{
            color: '#0c5460',
            paddingLeft: '1.5rem',
            fontSize: '0.9rem'
          }}>
            <li>Try accessing protected pages normally - should be blocked</li>
            <li>Run the exploit script with the x-middleware-subrequest header</li>
            <li>Observe authentication bypass</li>
            <li>Analyze the vulnerability behavior</li>
          </ol>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e7f3ff',
          borderRadius: '5px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#004085'
        }}>
          <p>
            Use the provided Python exploit script to test this vulnerability:
            <code style={{
              backgroundColor: '#fff',
              padding: '0.2rem 0.4rem',
              borderRadius: '3px',
              fontFamily: 'monospace'
            }}>
              python exploit/cve_2025_29927.py -u http://localhost:3000
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}

function TestLink({ title, description, path, status }: {
  title: string,
  description: string,
  path: string,
  status: 'Protected' | 'Public'
}) {
  const isProtected = status === 'Protected'
  const statusColor = isProtected ? '#dc3545' : '#28a745'
  const statusBg = isProtected ? '#f8d7da' : '#d4edda'

  return (
    <Link href={path} style={{
      textDecoration: 'none',
      display: 'block',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      transition: 'all 0.2s'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <h3 style={{
          color: '#333',
          fontSize: '1.1rem',
          margin: 0
        }}>
          {title}
        </h3>
        <span style={{
          backgroundColor: statusBg,
          color: statusColor,
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {status}
        </span>
      </div>
      <p style={{
        color: '#666',
        fontSize: '0.9rem',
        margin: 0
      }}>
        {description}
      </p>
      <p style={{
        color: '#007bff',
        fontSize: '0.8rem',
        marginTop: '0.5rem',
        margin: 0
      }}>
        {path}
      </p>
    </Link>
  )
}
