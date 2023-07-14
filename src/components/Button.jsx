const Button = ({ style, title, onClick, type }) => {
  let classes = "";

  switch (style) {
    case "delete":
      classes =
        "border bg-red-500 border-red-500 text-white hover:bg-white hover:text-red-500 hover:border-white";
      break;
    case "primary":
      classes =
        "border bg-white border-green-500 text-green-500 hover:bg-green-500 hover:text-white";
      break;
    case "close":
      classes =
        "border border-slate-200 text-slate-500";
      break;
    case "thumbAddNew":
      classes = "leading-normal h-full w-full text-2xl text-slate-400";
      break;
    default:
      break;
  }
  return (
    <button
      type={type ? type : "button"}
      className={`${classes} text- ease-in-out duration-200 px-3 py-2 rounded font-semibold`}
      onClick={onClick}
    >
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </button>
  );
};

export default Button;
