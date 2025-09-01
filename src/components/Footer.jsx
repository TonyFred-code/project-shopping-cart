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

  @media screen and (min-width: 900px) {
    & {
      display: flex;
      padding-bottom: 0.5rem;
    }

    & > * {
      flex: 1;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <section className="footer-about">
        <h2 className={classNames(baseStyles.fontQuicksandBold)}>fruit.era</h2>
        <p>
          By providing a wide variety of locally grown and imported fruits, we
          aim to support healthier lifestyles while also connecting farmers with
          the people who need their produce most.
        </p>
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
