import "../css/button.css";

function CityButton(props) {
  const className = `btn-city ${props.selected ? "btn-selected" : ""}`;

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export default CityButton;
