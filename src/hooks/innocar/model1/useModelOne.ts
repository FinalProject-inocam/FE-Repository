import { useState } from "react";
import { useModelOneType } from "../../../types";


export const useModelOne = ():useModelOneType => {

  /* [00] 모달에서 사용될, M1CharacterTitle ------------------------------------------------------- */
  const M1CharacterTitle = [
    ["171,100,000 KRW 부터", "가격"],
    ["288 kW/392 PS", "Max. Power (kW) - only relevant for Korea/Max. Power (PS)"],
    ["293 km/h", "Top speed"]
  ]
  
  /* [01] 모달에서 사용될, 기술 사양에 대한 배열 : technicalInfo ------------------------------------------------------- */
  const technicalInfo = {
    powerUnit : [
      ["Number of cylinders", "6"],
      ["Bore", "91.0mm"],
      ["Stroke", "76.4 mm"],
      ["Displacement", "2,981 cc"],
      ["Max. Power (PS)", "392 PS"],
      ["Max. Power (kW) - only relevant for Korea", "288 kW"],
      ["RPM point maximum power", "6,500 r/min"],
      ["Maximum engine speed", "7,500 r/min"],
      ["Max. torque", "45.9 kg·m"],
      ["RPM range maximum torque", "1,950 - 5,000 r/min"],
    ],
    performance : [
      ["Top speed","293 km/h"],
      ["Acceleration 0 - 100 km/h","4.2 s"],
      ["Acceleration 0 - 100 km/h with Sport Chrono Package","4.0 s"],
      ["Acceleration 0 - 160 km/h","9.3 s"],
      ["Acceleration 0 - 160 km/h with Sport Chrono Package","9.0 s"],
      ["Acceleration 0 - 200 km/h","14.5 s"],
      ["Acceleration 0 - 200 km/h with Sport Chrono Package","14.2 s"],
      ["In-gear acceleration (80-120km/h) (50-75 mph)","2.6 s"],
    ],
    body : [
      ["Length", "4520 mm"],
      ["Width", "1850 mm"],
      ["Width (with mirrors)", "2,024 mm"],
      ["Height", "1300 mm"],
      ["Wheelbase", "2,450 mm"],
      ["Turning circle", "11.2 m"],
      ["Unladen weight (DIN)", "1520 kg"],
      ["Permissible gross weight", "1780 kg"],
      ["Maximum load", "455 kg"],
      ["Maximum permissible roof load with Porsche roof transport system", "75 kg"],
    ],
    capacities : [
      ["Luggage compartment volume, front", "132 ℓ"],
      ["Open luggage compartment volume (behind front seats)", "264 ℓ"],
      ["Fuel tank", "64 ℓ"],
    ],
    consumptionEmissions : [
      ["Fuel consumption urban", "7.6 km/ℓ"],
      ["Fuel consumption non-urban", "10.0 km/ℓ"],
      ["Fuel consumption combined", "8.5 km/ℓ"],
      ["CO2 emissions combined","204 g/km"]
    ],
    price : [
      ["포르쉐 더블 클러치(PDK)","171,100,000 KRW 부터"]
    ]
  }

  /* [02] 모달에서 사용될, 기술 사양에 대한 배열의 토글 버튼을 제어하기 위한 TechnicalLists  ------------------------------------------------------- */
  const [info1, setInfo1] = useState<boolean>(false)
  const [info2, setInfo2] = useState<boolean>(false)
  const [info3, setInfo3] = useState<boolean>(false)
  const [info4, setInfo4] = useState<boolean>(false)
  const [info5, setInfo5] = useState<boolean>(false)
  const [info6, setInfo6] = useState<boolean>(false)

  const TechnicalLists = [
    {
      title:"Power Unit",
      technicalInfoCategory:"powerUnit",
      infoBoolean:info1,
      setInfoBoolean:setInfo1
    },
    {
      title:"Performance",
      technicalInfoCategory:"performance",
      infoBoolean:info2,
      setInfoBoolean:setInfo2
    },
    {
      title:"Body",
      technicalInfoCategory:"body",
      infoBoolean:info3,
      setInfoBoolean:setInfo3
    },
    {
      title:"Capacities",
      technicalInfoCategory:"capacities",
      infoBoolean:info4,
      setInfoBoolean:setInfo4
    },
    {
      title:"Consumption/Emissions",
      technicalInfoCategory:"consumptionEmissions",
      infoBoolean:info5,
      setInfoBoolean:setInfo5
    },
    {
      title:"가격",
      technicalInfoCategory:"price",
      infoBoolean:info6,
      setInfoBoolean:setInfo6
    }
  ]

  /* [03] 모달에서 사용될, 우측 차량 이미지에 대한 innoCarImgText  ------------------------------------------------------- */
  const innoCarImgText = [
    {
      title: "Height", 
      content :"1,300 mm",
      top:50,
      left:50,
    },
    {
      title: "Width", 
      content :"1,850 mm",
      top:50,
      left:200,
      types:"DesckTop"
    },
    {
      title: "Width", 
      content :"1,850 mm",
      top:50,
      mRight:50,
      types:"Mobile",
      tAlign:"end"
    },
    {
      title: "Wheelbase", 
      content :"2,450 mm",
      top:500,
      left:50,
      mTop:400
    },
    {
      title: "Length", 
      content :"4,520 mm",
      top:500,
      right:50,
      mTop:400,
      tAlign:"end"
    }
  ]

  return {M1CharacterTitle, technicalInfo, TechnicalLists, innoCarImgText}
}