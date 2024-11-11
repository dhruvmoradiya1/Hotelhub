import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
        <Link to="/">HotelHub</Link>
        </span>
        <span className="text-white font-bold tracking-tight flex gap-2">
          <p className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600 hover:rounded-sm">Privacy Policy</p>
          <p className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600 hover:rounded-sm">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;