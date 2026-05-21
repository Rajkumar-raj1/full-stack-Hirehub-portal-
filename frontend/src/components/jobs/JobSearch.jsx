import Input from "../common/Input.jsx";

const JobSearch = ({
  keyword,
  setKeyword,
  onSearch,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;

    setKeyword(value);

    onSearch(value);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <Input
        type="text"
        placeholder="Search jobs by title, company, skills..."
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
};

export default JobSearch;