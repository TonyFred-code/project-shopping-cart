import classNames from 'classnames';
import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import Icon from '@mdi/react';
import { mdiGithub, mdiMail, mdiPhone } from '@mdi/js';

const FooterWrapper = styled.footer`
  & {
    background-color: green;
    color: white;
    padding: 0 1rem;
  }

  h2 {
    border-bottom: 2px solid white;
    width: min(300px, 75%);
    padding: 1rem;
    font-size: 2.3rem;
  }

  .footer-about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-about button {
    align-self: flex-end;
    display: flex;
    color: green;
    background-color: white;
    border: 2px solid white;
    outline: none;
    padding: 1rem 1.25rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
  }

  address {
    padding: 1rem;
  }

  address p {
    display: flex;
    flex-direction: column;
  }

  address p span {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  address p a {
    align-self: flex-end;
    color: inherit;
    text-decoration: none;
  }

  .copyright {
    margin-top: auto;
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    padding: 0.8rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <section className="footer-about">
        <h2 className={classNames(baseStyles.fontQuicksandBold)}>fruit.era</h2>
        <p>
          We are passionate about bringing fresh, healthy, and affordable fruits
          closer to you. Our mission is to make it easier for everyone to enjoy
          nature&apos;s sweetness, whether for snacking, cooking, or juicing.
        </p>
        <button type="button" className="read-more">
          Read More
        </button>
      </section>
      <section className="contact-info">
        <h2 className={classNames(baseStyles.fontQuicksandBold)}>
          Contact Details
        </h2>
        <address>
          <p>
            <span>
              <Icon path={mdiPhone} size={1.2} />
              Telephone:
            </span>
            <a href="tel:+2349112420253">0911-242-0253</a>
          </p>
          <p>
            <span>
              <Icon path={mdiMail} size={1.2} />
              Email Address:
            </span>
            <a href="mailto:alfredfaith35@gmail.com">
              {' '}
              alfredfaith35@gmail.com
            </a>
          </p>
        </address>
        <div className="copyright">
          <span>&copy; {new Date().getFullYear()}. All Rights Reserved</span>
          <a
            href="https://github.com/TonyFred-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon path={mdiGithub} size={1} color="inherit" />
          </a>
        </div>
      </section>
    </FooterWrapper>
  );
}
