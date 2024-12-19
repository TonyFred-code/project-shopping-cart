import { Link } from 'react-router-dom';
import CustomButton from './components/CustomButton/CustomButton';
import baseStyles from './styles/base.module.css';
import classNames from 'classnames';

function App() {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p className={classNames(baseStyles.uFlex)}>
        Here are some examples of links to other pages
      </p>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
      <p>
        <CustomButton
          className={baseStyles.btn}
          onClick={() => {
            alert('you clicked a styled comp btn');
          }}
        />
      </p>
    </div>
  );
}

export default App;
