import React from 'react';
import Fetch from 'react-fetch-component';
import SearchInput from '../SearchInput'

const ImageContainer = () => {
	const location = 'paris';
	return (
		<Fetch
			url={`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${location}&client_id=${process.env
				.REACT_APP_UNSPLASH_ACCESS_KEY}`}
		>
			{({ loading, data, error }) => (
				<>
					{loading && <span>Loading...</span>}

					{data && (
                        <>
                            <div
                                className="n-image-container"
                                style={{
                                    backgroundImage: `url(${data.results[0].urls.regular})`
                                }}
                            />
                            <div
                                className="n-image-container__main"
                                style={{
                                    backgroundImage: `url(${data.results[0].urls.regular})`
                                }}
                            >
                                <SearchInput />
                            </div>
                        </>
					)}
				</>
			)}
		</Fetch>
	);
};

export default ImageContainer;
