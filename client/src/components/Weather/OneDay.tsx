import { useState } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import { OneDayWeather } from "../../types/propsTypes";

export default function OneDay({ day }: OneDayWeather): JSX.Element {
  const [icon] = useState<string>(day.weather[0].main);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MDBCol>
          <MDBCard
            style={{
              color: "#4B515D",
              borderRadius: "20px",
              width: "70px",
              height: "80px",
              margin: "2px",
            }}
          >
            <MDBCardBody className="p-2">
              <div>
                <MDBTypography
                  tag="h6"
                  className="flex-grow-1"
                  style={{ textAlign: "center", fontSize: "0.9rem" }}
                >
                  {day.dt_txt.slice(5, -8)}
                </MDBTypography>
                <MDBTypography
                  tag="h6"
                  className="flex-grow-1"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {Math.floor(day.main.feels_like - 273.15)}°C
                </MDBTypography>

                <div style={{ fontSize: "1.8rem" }}>
                  {icon !== "Clouds" && icon !== "Rain" && "🌞"}
                  {icon === "Clouds" && "🌤️"}
                  {icon === "Rain" && "🌦️"}
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    </>
  );
}
