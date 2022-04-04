import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const clearAll = () => {
    localStorage.clear();
    navigate("/reglog");
  };
  return (
    <div>
      <h1>
        <span>Show Details</span>
        <button className='btn' onClick={clearAll}>
          <b>Log Out</b>
        </button>
      </h1>
    </div>
  );
};
export default Logout;
