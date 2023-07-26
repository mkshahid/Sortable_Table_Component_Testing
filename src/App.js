import "bootstrap/dist/css/bootstrap.css";
import SortableTable from "./SortableTable";

export default function App() {
  const rows = [
    { title: "Post A", score: 5 },
    { title: "Post B", score: 3 },
    { title: "Post D", score: 9 },
    { title: "Post E", score: 8 },
    { title: "Post C", score: 1 }
  ];

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

  return (
    <div className="container mt-3">
      <SortableTable rows={rows} columns={columns} defaultSort="score:desc" />
      <SortableTable rows={rows} columns={columns} defaultSort="score:asc" />
      <SortableTable rows={rows} columns={columns} defaultSort="title:asc" />
    </div>
  );
}
