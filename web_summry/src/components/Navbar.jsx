function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🌷 WebSummry
      </div>

      <ul className="nav-links">
        <li>🏠 Home</li>

        <li>✨ Add Prompt</li>

        <li>📚 My Prompts</li>

        <li>📖 How It Works</li>

        <li>💌 Contact</li>

        <li>ℹ️ About</li>
      </ul>

      <button className="login-btn">
        👤 Login
      </button>

    </nav>
  );
}

export default Navbar;