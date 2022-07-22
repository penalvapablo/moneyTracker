import Loader from 'react-js-loader';
import './Loader.css';

export const LoaderView = () => {
  return (
    <div className="loader">
      <Loader
        type="bubble-loop"
        bgColor={'white'}
        title={''}
        color={'white'}
        size={100}
      />
    </div>
  );
};
