import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-logo">Blog</p>
        <ul className="footer-nav">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
