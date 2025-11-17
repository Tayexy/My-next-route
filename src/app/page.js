import "./style.css";

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <header className="header">
        <div className="logo">UrbanBeat Store</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Beats</a>
          <a href="#">Producers</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Buy & Download High-Quality Beats</h1>
          <p>Your top marketplace for trap, afrobeat, hip hop, and R&B instrumentals.</p>
          <button className="btn">Browse Beats</button>
        </div>
      </section>

      {/* BEATS SECTION */}
      <section className="beats">
        <h2>Featured Beats</h2>

        <div className="beat-grid">

          <div className="beat-card">
            <img src="/images/beat1.jpg" alt="Beat Cover" />
            <h3>Midnight Vibes</h3>
            <p>$29.99</p>
            <button className="add-btn">Add to Cart</button>
          </div>

          <div className="beat-card">
            <img src="/images/beat2.jpg" alt="Beat Cover" />
            <h3>Trap Energy</h3>
            <p>$19.99</p>
            <button className="add-btn">Add to Cart</button>
          </div>

          <div className="beat-card">
            <img src="/images/beat3.jpg" alt="Beat Cover" />
            <h3>Sweet Afro</h3>
            <p>$34.99</p>
            <button className="add-btn">Add to Cart</button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} UrbanBeat Store — All Rights Reserved.</p>
      </footer>
    </main>
  );
}
