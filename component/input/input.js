const Input = ({ type, label, state, setState }) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" id="username">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
        type={type}
        id={label}
        placeholder={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      
    </>
  );
};

export default Input;
