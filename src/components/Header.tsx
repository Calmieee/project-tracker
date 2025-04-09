import { useLocation } from 'react-router-dom';
import HeaderUI from './ui/header/Header.tsx';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string): Boolean => {
    return location.pathname === path;
  }

  return <HeaderUI isActive={isActive} />

};

export default Header;