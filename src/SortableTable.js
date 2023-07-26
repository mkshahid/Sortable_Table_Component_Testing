import { Component } from "react";
import sortBy from "lodash.sortby";

export default class SortableTable extends Component {
  constructor(props) {
    super(props);

    const { rows, defaultSort } = this.props;
    const [defaultSortedField, defaultSortDirection] = defaultSort.split(":");

    let initialSortedRows = sortBy(rows, [defaultSortedField]);

    if (defaultSortDirection === "desc") {
      initialSortedRows = initialSortedRows.reverse();
    }

    this.state = {
      currentSortedField: defaultSortedField,
      currentSortDirection: defaultSortDirection,
      sortedRows: initialSortedRows
    };
  }

  sortRows(field) {
    const { rows } = this.props;
    const { currentSortedField, currentSortDirection } = this.state;

    if (field === currentSortedField) {
      if (currentSortDirection === "asc") {
        this.setState({
          currentSortDirection: "desc",
          sortedRows: sortBy(rows, [currentSortedField]).reverse()
        });
      } else {
        this.setState({
          currentSortDirection: "asc",
          sortedRows: sortBy(rows, [currentSortedField])
        });
      }
    } else {
      this.setState({
        currentSortedField: field,
        currentSortDirection: "asc",
        sortedRows: sortBy(rows, [field])
      });
    }
  }

  render() {
    const { columns } = this.props;
    const { currentSortedField, currentSortDirection, sortedRows } = this.state;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map(({ field, header }) => {
              return (
                <th
                  key={field}
                  data-testid={`th-${field}`}
                  onClick={() => {
                    this.sortRows(field);
                  }}
                >
                  {header}{" "}
                  {currentSortedField === field && `(${currentSortDirection})`}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => {
            return (
              <tr key={i}>
                {columns.map(({ field }) => {
                  return (
                    <td key={field} data-testid={`td-${field}-${i}`}>
                      {row[field]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
