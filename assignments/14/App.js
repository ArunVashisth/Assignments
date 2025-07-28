const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    React.createElement('div', {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        fontFamily: 'Segoe UI, Arial, sans-serif'
      }
    },
      React.createElement('div', {
        style: {
          background: '#fff',
          padding: '40px 32px',
          borderRadius: '18px',
          boxShadow: '0 8px 32px rgba(60,72,100,0.15)',
          minWidth: '320px',
          textAlign: 'center',
          transition: 'box-shadow 0.2s',
        }
      },
        React.createElement('h1', {
          style: {
            fontWeight: 700,
            fontSize: '2.2rem',
            color: '#4f46e5',
            marginBottom: '18px',
            letterSpacing: '1px',
          }
        }, 'Counter App'),
        React.createElement('div', {
          style: {
            fontSize: '3.5rem',
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '28px',
            marginTop: '10px',
          }
        }, count),
        React.createElement('div', null,
          React.createElement('button', {
            onClick: () => setCount(count + 1),
            style: {
              marginRight: '14px',
              padding: '12px 28px',
              fontSize: '1.2em',
              borderRadius: '8px',
              border: 'none',
              background: '#4f46e5',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(79,70,229,0.08)',
              transition: 'background 0.2s',
            },
            onMouseOver: function(e){e.target.style.background='#6366f1'},
            onMouseOut: function(e){e.target.style.background='#4f46e5'},
          }, '+'),
          React.createElement('button', {
            onClick: () => setCount(count - 1),
            style: {
              marginRight: '14px',
              padding: '12px 28px',
              fontSize: '1.2em',
              borderRadius: '8px',
              border: 'none',
              background: '#818cf8',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(129,140,248,0.08)',
              transition: 'background 0.2s',
            },
            onMouseOver: function(e){e.target.style.background='#6366f1'},
            onMouseOut: function(e){e.target.style.background='#818cf8'},
          }, '-'),
          React.createElement('button', {
            onClick: () => setCount(0),
            style: {
              marginLeft: '0',
              padding: '12px 28px',
              fontSize: '1.2em',
              borderRadius: '8px',
              border: 'none',
              background: '#e0e7ff',
              color: '#4f46e5',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(224,231,255,0.08)',
              transition: 'background 0.2s',
            },
            onMouseOver: function(e){e.target.style.background='#c7d2fe'},
            onMouseOut: function(e){e.target.style.background='#e0e7ff'},
          }, 'Reset')
        )
      )
    )
  );
}

// Attach App to window for UMD usage
window.App = App;
