import './More.css';

function More({ handleMore, visible }) {
  return (
    <button onClick={handleMore} className={'more' + (visible ? ' more_visible' : '')}>Ещё</button>
  );
}

export default More;
