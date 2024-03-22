import { getLandmarksAll } from "../service/Service";

const ListLandMark = () => {
  const landmarks = getLandmarksAll();
  const listStyle: React.CSSProperties = {
    // ใช้ประเภท React.CSSProperties ที่นี่
    maxHeight: "700px",
    overflowY: "scroll",
    // border: "1px solid #ccc",
    scrollbarWidth: "none",
    fontFamily: "Sarabun",
    textAlign: "start",
  };

  return (
    <div style={listStyle}>
      {" "}
      {/* ตอนนี้ style นี้จะเข้ากันได้กับ TypeScript */}
      {landmarks.map((country, index) => (
        <div key={index}>
          <h2>{country.country}</h2>
          <ul>
            {country.landmark.map((landmark, index) => (
              <li key={index}>{landmark}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListLandMark;
