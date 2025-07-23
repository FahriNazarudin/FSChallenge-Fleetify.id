export default function Button(props) {
  const { title, type = "button", onClick, variant = "primary" , className} = props;


  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
