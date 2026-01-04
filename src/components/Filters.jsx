const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  clearFilters,
  categories,
}) => {
  return (
    <div className="filters">
      <input
        placeholder="Search product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by Price</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default Filters;
