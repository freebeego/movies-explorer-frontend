import './More.css';

function More({ handleMore }) {
  return (
    <button onClick={handleMore} className="more">Ещё</button>
  );
}

export default More;
