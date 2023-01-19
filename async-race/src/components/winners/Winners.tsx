import "./Winners.scss";

function Winners({ garageView }: { garageView: boolean }) {
  return (
    <section className={`winners ${garageView ? "hidden" : ""}`}>
      <h2>Winners</h2>
      <h3>Page #1</h3>
    </section>
  );
}

export default Winners;
