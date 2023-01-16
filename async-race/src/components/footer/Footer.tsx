import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer_part">
        Created by <span className="icon">engineering</span>
        <a
          className="link"
          href="https://github.com/mshns/"
          title="github.com/mshns"
        >
          mshns
        </a>
      </p>
      <p className="footer_part">
        Async Race <span className="icon">copyright</span> 2023
      </p>
      <a href="https://rs.school/js/" title="rs.school/js">
        <span className="footer_image"></span>
      </a>
    </footer>
  );
}

export default Footer;
