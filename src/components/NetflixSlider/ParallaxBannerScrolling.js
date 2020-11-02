import React from 'react'


const ParallaxBannerScrolling = () => (

    <ParallaxBanner
    className="your-class"
    layers={[
        {

            
            image: 'https://foo.com/foo.jpg',
            amount: 0.1,
        },
        {
            image: 'https://foo.com/bar.png',
            amount: 0.2,
        },
    ]}
    style={{
        height: '500px',
    }}
>
    <h1>Banner Children</h1>
</ParallaxBanner>



)


export default ParallaxBannerScrolling