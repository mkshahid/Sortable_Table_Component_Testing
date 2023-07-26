import { render, fireEvent } from "@testing-library/react";
import SortableTable from "./SortableTable";

const columns = [
  {
    field: "title",
    header: "Title"
  },
  {
    field: "score",
    header: "Score"
  }
];

const rows = [
  { title: "Post A", score: 5 },
  { title: "Post B", score: 3 },
  { title: "Post D", score: 9 },
  { title: "Post E", score: 8 },
  { title: "Post C", score: 1 }
];

test("the table headers", () => {
  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="score:desc" />
  );

  // You should have at least 2 assertions
  // Verify that the Title table header renders "Title"
  expect(getAllByTestId("th-title")[0].innerHTML).toBe("Title ");
  // Verify that the Score table header renders "Score (desc)"
  expect(getAllByTestId("th-score")[0].innerHTML).toBe("Score (desc)");
});

test("rendering rows with a numeric field default sort in ascending order", () => {
  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="score:asc" />
  );

  // You should have at least 6 assertions
  // Verify that the table rows are rendered in the correct order
  expect(getAllByTestId("td-score-0")[0].innerHTML).toBe("1");
  expect(getAllByTestId("td-score-1")[0].innerHTML).toBe("3");
  expect(getAllByTestId("td-score-2")[0].innerHTML).toBe("5");
  expect(getAllByTestId("td-score-3")[0].innerHTML).toBe("8");
  expect(getAllByTestId("td-score-4")[0].innerHTML).toBe("9");
  // Verify that the correct table header has the correct sort direction
  expect(getAllByTestId("th-score")[0].textContent).toBe("Score (asc)");
});

test("rendering rows with a numeric field default sort in descending order", () => {
  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="score:desc" />
  );

  // You should have at least 6 assertions
  // Verify that the table rows are rendered in the correct order
  expect(getAllByTestId("td-score-0")[0].innerHTML).toBe("9");
  expect(getAllByTestId("td-score-1")[0].innerHTML).toBe("8");
  expect(getAllByTestId("td-score-2")[0].innerHTML).toBe("5");
  expect(getAllByTestId("td-score-3")[0].innerHTML).toBe("3");
  expect(getAllByTestId("td-score-4")[0].innerHTML).toBe("1");
  // Verify that the correct table header has the correct sort direction
  expect(getAllByTestId("th-score")[0].innerHTML).toBe("Score (desc)");
});

test("rendering rows with a string field default sort in ascending order", () => {
  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="title:asc" />
  );

  // You should have at least 6 assertions
  // Verify that the table rows are rendered in the correct order
  expect(getAllByTestId("td-title-0")[0].innerHTML).toBe("Post A");
  expect(getAllByTestId("td-title-1")[0].innerHTML).toBe("Post B");
  expect(getAllByTestId("td-title-2")[0].innerHTML).toBe("Post C");
  expect(getAllByTestId("td-title-3")[0].innerHTML).toBe("Post D");
  expect(getAllByTestId("td-title-4")[0].innerHTML).toBe("Post E");
  // Verify that the correct table header has the correct sort direction
  expect(getAllByTestId("th-title")[0].innerHTML).toBe("Title (asc)");
});

test("rendering rows with a string field default sort in descending order", () => {
  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="title:desc" />
  );

  // You should have at least 6 assertions
  // Verify that the table rows are rendered in the correct order
  expect(getAllByTestId("td-title-0")[0].innerHTML).toBe("Post E");
  expect(getAllByTestId("td-title-1")[0].innerHTML).toBe("Post D");
  expect(getAllByTestId("td-title-2")[0].innerHTML).toBe("Post C");
  expect(getAllByTestId("td-title-3")[0].innerHTML).toBe("Post B");
  expect(getAllByTestId("td-title-4")[0].innerHTML).toBe("Post A");
  // Verify that the correct table header has the correct sort direction
  expect(getAllByTestId("th-title")[0].innerHTML).toBe("Title (desc)");
});

test("clicking on a table header with the sort reverses the sort", () => {
  // const onClick = jest.fn();

  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="title:desc" />
  );

  // You should have at least 12 assertions
  const titleHeader = getAllByTestId("th-title")[0];

  fireEvent.click(titleHeader);
  expect(getAllByTestId("td-title-0")[0].innerHTML).toBe("Post A");
  expect(getAllByTestId("td-title-1")[0].innerHTML).toBe("Post B");
  expect(getAllByTestId("td-title-2")[0].innerHTML).toBe("Post C");
  expect(getAllByTestId("td-title-3")[0].innerHTML).toBe("Post D");
  expect(getAllByTestId("td-title-4")[0].innerHTML).toBe("Post E");
  expect(getAllByTestId("th-title")[0].innerHTML).toBe("Title (asc)");

  expect(getAllByTestId("td-score-0")[0].innerHTML).toBe("5");
  expect(getAllByTestId("td-score-1")[0].innerHTML).toBe("3");
  expect(getAllByTestId("td-score-2")[0].innerHTML).toBe("1");
  expect(getAllByTestId("td-score-3")[0].innerHTML).toBe("9");
  expect(getAllByTestId("td-score-4")[0].innerHTML).toBe("8");
  expect(getAllByTestId("th-score")[0].innerHTML).toBe("Score ");
});

test("clicking on a table header without the sort applies an ascending sort to that column", () => {
  // const onClick = jest.fn();

  const { getAllByTestId } = render(
    <SortableTable rows={rows} columns={columns} defaultSort="title:desc" />
  );

  // You should have at least 12 assertions
  const scoreHeader = getAllByTestId("th-score")[0];

  fireEvent.click(scoreHeader);

  // You should have at least 12 assertions
  expect(getAllByTestId("td-title-0")[0].innerHTML).toBe("Post C");
  expect(getAllByTestId("td-title-1")[0].innerHTML).toBe("Post B");
  expect(getAllByTestId("td-title-2")[0].innerHTML).toBe("Post A");
  expect(getAllByTestId("td-title-3")[0].innerHTML).toBe("Post E");
  expect(getAllByTestId("td-title-4")[0].innerHTML).toBe("Post D");
  expect(getAllByTestId("th-title")[0].innerHTML).toBe("Title ");

  expect(getAllByTestId("td-score-0")[0].innerHTML).toBe("1");
  expect(getAllByTestId("td-score-1")[0].innerHTML).toBe("3");
  expect(getAllByTestId("td-score-2")[0].innerHTML).toBe("5");
  expect(getAllByTestId("td-score-3")[0].innerHTML).toBe("8");
  expect(getAllByTestId("td-score-4")[0].innerHTML).toBe("9");
  expect(getAllByTestId("th-score")[0].innerHTML).toBe("Score (asc)");
});
