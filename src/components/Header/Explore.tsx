import Link from "next/link";

type TitleProps = {
    text: string;
};

const Explore = ({ text }: TitleProps) => {
    return <Link href='/explore' className="text-xl font-bold pl-6" style={{ cursor: 'pointer' }}>{text}</Link>;
};

export default Explore;