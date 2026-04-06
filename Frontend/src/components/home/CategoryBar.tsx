import { CATEGORIES } from "./HomeData";

interface CategoryBarProps {
  active: string;
  setActive: (value: string) => void;
}

const CategoryBar = ({ active, setActive }: CategoryBarProps) => (
  <div className="cat-bar">
    {CATEGORIES.map(c => (
      <button
        key={c.id}
        className={`cat-tab ${active === c.id ? "cat-tab--active" : ""}`}
        onClick={() => setActive(c.id)}
      >
        <div className="cat-tab__content">
          <span className="cat-tab__emoji">{c.emoji}</span>
          <span className="cat-tab__label">{c.label}</span>
        </div>
      </button>
    ))}
  </div>
);

export default CategoryBar;
