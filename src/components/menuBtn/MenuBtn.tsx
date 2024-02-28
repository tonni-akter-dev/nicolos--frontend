import Link from 'next/link';
import Image from 'next/image';
import './menuBtn.scss';

interface MenuBtnProps {
  icon?: string | undefined;
  link?: string;
  text: string;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ icon, link, text, isActive, onClick }) => {
  return (
    <>
      <Link
        className={`menuBtn ${isActive ? 'active' : ''}`}
        href={link ? link : '#'}
        onClick={onClick}
      >
        {isActive && <div className="bar"></div>}
        {icon && <Image src={icon} alt="Icon" />}
        {text}
      </Link>

    </>
  );
};

export default MenuBtn;
