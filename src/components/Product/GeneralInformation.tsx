import Image from 'next/image';
import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaUsers, FaChartLine, FaTwitter, FaFacebook } from 'react-icons/fa';

interface DataProps {
    description?: { en: string };
    image?: { large: string };
    name: string;
    symbol: string;
    market_cap_rank: number;
    watchlist_portfolio_users: number;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    links?: {
        homepage?: string[];
        whitepaper?: string;
        twitter_screen_name?: string;
        facebook_username?: string;
    };
    genesis_date?: string;
}

interface GeneralInformationProps {
    data: DataProps;
}

const CoinHeader: React.FC<{ image?: string, name: string, symbol: string }> = ({ image, name, symbol }) => (
    <div className='flex items-center'>
        {image && (
            <Image
                src={image}
                alt={name}
                width={25}
                height={25}
                className="mb-4 h-10 w-10"
            />
        )}
        <h2 className="text-2xl font-bold mb-4 pl-2">{name} ({symbol})</h2>
    </div>
);

const CoinStats: React.FC<{ market_cap_rank: number, watchlist_portfolio_users: number, sentiment_votes_up_percentage: number, sentiment_votes_down_percentage: number }> = ({
    market_cap_rank,
    watchlist_portfolio_users,
    sentiment_votes_up_percentage,
    sentiment_votes_down_percentage
}) => (
    <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="flex items-center"><FaChartLine className="mr-2" /> {market_cap_rank || 'nil'}</p>
        <p className="flex items-center"><FaUsers className="mr-2" /> {watchlist_portfolio_users || 'nil'}</p>
        <p className="flex items-center"><FaThumbsUp className="mr-2" /> {sentiment_votes_up_percentage ? `${sentiment_votes_up_percentage}%` : 'nil'}</p>
        <p className="flex items-center"><FaThumbsDown className="mr-2" /> {sentiment_votes_down_percentage ? `${sentiment_votes_down_percentage}%` : 'nil'}</p>
    </div>
);

const Description: React.FC<{ description?: string }> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const getShortDescription = (description: string = '') => {
        const words = description.split(' ');
        return words.length > 70 ? `${words.slice(0, 70).join(' ')} ...` : description;
    };

    const descriptionHtml = isExpanded ? description : getShortDescription(description);
    const safeDescriptionHtml = descriptionHtml || '';

    return (
        <div>
            <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
            ></div>
            <button
                onClick={toggleExpand}
                className="text-blue-500 hover:underline mb-4"
            >
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </div>
    );
};

const Links: React.FC<{ links?: { homepage?: string[], whitepaper?: string, twitter_screen_name?: string, facebook_username?: string } }> = ({ links }) => (
    <div className="links mb-4 flex ">
        {links?.homepage?.[0] && (
            <a
                href={links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mr-2"
            >
                Official Website
            </a>
        )}
        <div className='w-2'></div>

        {links?.whitepaper && (
            <a
                href={links.whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                Whitepaper
            </a>
        )}
        <div className='w-4'></div>

        {links?.twitter_screen_name && (
            <a
                href={`https://twitter.com/${links.twitter_screen_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mr-2 flex items-center"
            >
                <FaTwitter className="mr-1" /> Twitter
            </a>
        )}
        <div className='w-2'></div>

        {links?.facebook_username && (
            <a
                href={`https://facebook.com/${links.facebook_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center"
            >
                <FaFacebook className="mr-1" /> Facebook
            </a>
        )}
    </div>
);

const GenesisDate: React.FC<{ genesis_date?: string }> = ({ genesis_date }) => (
    <p className="font-semibold">Genesis Date: {genesis_date}</p>
);

function GeneralInformation({ data }: GeneralInformationProps) {
    return (
        <div className="general-information p-4 rounded-lg">
            <CoinHeader image={data.image?.large} name={data.name} symbol={data.symbol} />
            <CoinStats
                market_cap_rank={data.market_cap_rank}
                watchlist_portfolio_users={data.watchlist_portfolio_users}
                sentiment_votes_up_percentage={data.sentiment_votes_up_percentage}
                sentiment_votes_down_percentage={data.sentiment_votes_down_percentage}
            />
            <Description description={data.description?.en} />
            <Links links={data.links} />
            <GenesisDate genesis_date={data.genesis_date} />
        </div>
    );
}

export default GeneralInformation;
