function IngredientsTable(props) {
  const { ingredients } = props;

  const getRows = () => {
    return ingredients.map((ingred) => {
      return (
        <tr key={ingred.item}>
          <td className="ingred-item">{ingred.item}</td>
          <td className="ingred-measure">{ingred.measurement}</td>
        </tr>
      );
    });
  };

  return (
    <table className="ingred-table">
      <tbody>{getRows()}</tbody>
    </table>
  );
}

export default IngredientsTable;
