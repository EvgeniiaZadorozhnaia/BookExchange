import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBTypography } from "mdb-react-ui-kit";
import { useAppSelector } from "../../redux/hooks";

export default function OneDay({ day }: IOneDay): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [icon, setIcon] = useState<string>(day.weather[0].main);

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
              width: "60px",
              height: "70px",
              margin: "7px",
            }}
          >
            <MDBCardBody className="p-2">
              <div>
                <MDBTypography tag="h6" className="flex-grow-1">
                  {day.dt_txt.slice(5, -8)}
                </MDBTypography>
                <MDBTypography
                  tag="h6"
                  className="flex-grow-1"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {Math.floor(day.main.feels_like - 273.15)}°C
                </MDBTypography>
              </div>

              <div>
                {icon !== "Clouds" && icon !== 'Rain' && (
                  <img
                    src="https://www.iguides.ru/upload/main/7e6/7e6e9d65c2711bc80528d9bf8248fa5b.jpg"
                    width="30px"
                    alt="sunnyIcon"
                  />
                )}
                {icon === "Clouds" && (
                  <img
                    src="https://i.pinimg.com/originals/90/98/27/909827385093992b96202898c8e3a5db.jpg"
                    width="30px"
                    alt="cloudsIcon"
                  />
                )}
                {icon === "Rain" && (
                  <img
                    src="https://www.svgrepo.com/show/212029/rain-weather.svg"
                    width="30px"
                    alt="rainIcon"
                  />
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    </>
  );
}
