import './loader.scss'; 

const LoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div className='loading-text'>Loading, Please Wait!!</div>
        <div className="loading-spinner"></div>
      </div>
    );
};

export default LoadingScreen;