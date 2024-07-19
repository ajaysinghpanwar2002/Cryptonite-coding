import Link from "next/link";

type TitleProps = {
    text: string;
};

const Title = ({ text }: TitleProps) => {
    return <Link href='/' className="text-xl font-bold" style={{ cursor: 'pointer' }}>{text}</Link>;
};

export default Title;