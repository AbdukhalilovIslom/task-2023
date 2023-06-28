import "./style.scss";

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <div
      style={loading ? { display: "flex" } : { display: "none" }}
      className={loading ? "loading active" : "loading"}
    >
      <div className="text">Loading...</div>
    </div>
  );
}
