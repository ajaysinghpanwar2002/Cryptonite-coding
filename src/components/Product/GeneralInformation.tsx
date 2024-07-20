import Image from 'next/image';
import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaUsers, FaChartLine, FaTwitter, FaFacebook } from 'react-icons/fa';

function GeneralInformation({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getShortDescription = (description) => {
        if (!description) return '';

        const words = description.split(' ');
        return words.slice(0, 70).join(' ') + ' ...';
    };

    const descriptionHtml = isExpanded ? data?.description?.en : getShortDescription(data?.description?.en);

    return (
        <div className="general-information p-4 rounded-lg">
            <div className='flex items-center'>
                <Image
                    src={data?.image?.large}
                    alt={data.name}
                    width={25}
                    height={25}
                    className="mb-4 h-10 w-10 "
                />
                <h2 className="text-2xl font-bold mb-4 pl-2">{data.name} ({data.symbol})</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <p className="flex items-center"><FaChartLine className="mr-2" /> {data.market_cap_rank}</p>
                <p className="flex items-center"><FaUsers className="mr-2" /> {data.watchlist_portfolio_users}</p>
                <p className="flex items-center"><FaThumbsUp className="mr-2" /> {data.sentiment_votes_up_percentage}%</p>
                <p className="flex items-center"><FaThumbsDown className="mr-2" /> {data.sentiment_votes_down_percentage}%</p>
            </div>
            <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            ></div>
            <button
                onClick={toggleExpand}
                className="text-blue-500 hover:underline mb-4"
            >
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            <div className="links mb-4 flex ">
                {data.links?.homepage?.[0] && (
                    <a
                        href={data.links.homepage[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mr-2"
                    >
                        Official Website
                    </a>
                )}
                <div className='w-2'></div>

                {data.links?.whitepaper && (
                    <a
                        href={data.links.whitepaper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Whitepaper
                    </a>
                )}
                <div className='w-4'></div>

                {data.links?.twitter_screen_name && (
                    <a
                        href={`https://twitter.com/${data.links.twitter_screen_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mr-2 flex items-center"
                    >
                        <FaTwitter className="mr-1" /> Twitter
                    </a>
                )}
                <div className='w-2'></div>

                {data.links?.facebook_username && (
                    <a
                        href={`https://facebook.com/${data.links.facebook_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                    >
                        <FaFacebook className="mr-1" /> Facebook
                    </a>
                )}
            </div>
            {/* <div className="social-media mb-4 flex ">
                {data.links?.twitter_screen_name && (
                    <a
                        href={`https://twitter.com/${data.links.twitter_screen_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mr-2 flex items-center"
                    >
                        <FaTwitter className="mr-1" /> Twitter
                    </a>
                )}
                {data.links?.facebook_username && (
                    <a
                        href={`https://facebook.com/${data.links.facebook_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                    >
                        <FaFacebook className="mr-1" /> Facebook
                    </a>
                )}
            </div> */}
            <p className="font-semibold">Genesis Date: {data.genesis_date}</p>
        </div>
    );
}

export default GeneralInformation;
