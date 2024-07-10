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
