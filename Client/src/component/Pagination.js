import React from "react";

function Pagination({ onChange, current }) {
  return (
    <nav aria-label="Page navigation example ">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={current === 1}
            onClick={() => onChange(current - 1)}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" value="1" onClick={() => onChange(1)}>
            1
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" value="2" onClick={() => onChange(2)}>
            2
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" value="3" onClick={() => onChange(3)}>
            3
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => onChange(current + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
