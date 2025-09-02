import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { array, bool } from 'prop-types';
import classNames from 'classnames';
import { ThreeDots } from 'react-loader-spinner';
import ImageFiller from 'react-image-filler';

const ShopByCategoryWrapper = styled.section`
  h2 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    width: min(75%, 300px);
  }

  .categories-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    padding: 2rem;
  }

  .category {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    border: 1px solid #eee;
    cursor: pointer;
  }

  .category:hover {
    box-shadow:
      0 3px 6px -4px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .category img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
`;

export default function ShopByCategory({ categories, loading }) {
  return (
    <ShopByCategoryWrapper>
      <h2 className={classNames(baseStyles.fontQuicksandBold)}>
        Shop by Categories
      </h2>
      {loading ? (
        <div className="loading-container">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="categories-container">
          {categories.map((item) => {
            return (
              <div className="category" key={item.id}>
                <div className="image-container">
                  <ImageFiller width={150} height={150} />
                </div>
                <div className="details">
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ShopByCategoryWrapper>
  );
}

ShopByCategory.propTypes = {
  categories: array,
  loading: bool,
};
