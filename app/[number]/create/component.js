export function Required() {
  return <span style={{ color: "red" }}>*</span>;
}

export function RequiredText() {
  return (
    <span style={{ color: "red", position: "absolute", left: 0 }}>
      <Required /> is required
    </span>
  );
}

export const buttonStyle = {
  padding: "0.75rem",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "center",
  marginLeft: "1rem",
};

export const marginStyle = {
  marginLeft: 0,
  marginBottom: "3rem",
};
export const topStyle = {
  height: "45px",
  marginTop: "8px",
};
