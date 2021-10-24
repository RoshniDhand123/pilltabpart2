type Props = {
  logo: any,
  className?: string
};

const AppLogo = ({ logo,className }: Props) => {
  return (
    <div>
        <img src={logo} alt="Logo"  className={className}/>
    </div>
  );
};

export default AppLogo;
