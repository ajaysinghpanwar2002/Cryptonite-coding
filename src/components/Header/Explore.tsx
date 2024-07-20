import Link from "next/link";

type TitleProps = {
    text: string;
};

const Explore = ({ text }: TitleProps) => {
    return <Link href='/explore' className="text-xl font-bold ml-10" style={{ cursor: 'pointer' }}>{text}</Link>;
};

export default Explore;