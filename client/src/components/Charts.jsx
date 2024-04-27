// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// CHART
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" }
];

// color
const Set3 = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  '#d9d9d9',
  '#bc80bd',
  '#ccebc5',
  '#ffed6f',
];


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const Charts = () => {

  // ================================================================================

  // SET DATA TO DATA CHARTS
  const [styleData, setStyleData] = useState([]);
  const [subSpaceData, setSubSpaceData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [mainMaterialData, setMainMaterialData] = useState([]);

  // Get Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furnifit-admin-backend.vercel.app/dataToCharts');
        // Fetch and set other data sets here if needed
        
        // Set Style Data
        const rawDataStyle = response.data.aggregatedData[2].data;
        const theStyleData = rawDataStyle.map((item, index) => ({
          id: index,
          value: item.value,
          label: item.label
        }));
        setStyleData(theStyleData);

        // Set Style Data
        const rawDataSubSpace = response.data.aggregatedData[3].data;
        const theSubSpaceData = rawDataSubSpace.map((item, index) => ({
          id: index,
          value: item.value,
          label: item.label
        }));
        setSubSpaceData(theSubSpaceData);

        // Set Style Data
        const rawDataType = response.data.aggregatedData[1].data;
        const theTypeData = rawDataType.map((item, index) => ({
          id: index,
          value: item.value,
          label: item.label
        }));
        setTypeData(theTypeData);

        // Set Style Data
        const rawMainMat = response.data.aggregatedData[0].data;
        const theMainMat = rawMainMat.map((item, index) => ({
          id: index,
          value: item.value,
          label: item.label
        }));
        setMainMaterialData(theMainMat);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="right-container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="card-stat">
              <div className="stat-subtitle">Furniture Data Chart</div>
              <div className="boundary">
                <div className="line"></div>
                <div className="text">based on</div>
                <div className="line"></div>
              </div>
              <div className="stat-title">Style</div>
              <PieChart
                colors={Set3}
                margin={{ right: data.length > 6 ? 95 : 200, left: data.length > 6 ? 0 : 10 }}
                slotProps={{ legend: { hidden: data.length > 6 ? true : false } }}
                series={[
                  {
                    data: styleData,
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
                width={data.length > 6 ? 570 : 450}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-stat">
              <div className="stat-subtitle">Furniture Data Chart</div>
              <div className="boundary">
                <div className="line"></div>
                <div className="text">based on</div>
                <div className="line"></div>
              </div>
              <div className="stat-title">Sub-Space</div>
              <PieChart
                colors={Set3}
                margin={{ right: data.length > 6 ? 95 : 120, left: data.length > 6 ? 0 : 10 }}
                slotProps={{ legend: { hidden: data.length > 6 ? true : false } }}
                series={[
                  {
                    data: subSpaceData,
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
                width={data.length > 6 ? 570 : 410}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-stat">
              <div className="stat-subtitle">Furniture Data Chart</div>
              <div className="boundary">
                <div className="line"></div>
                <div className="text">based on</div>
                <div className="line"></div>
              </div>
              <div className="stat-title">Furniture Types</div>
              <PieChart
                colors={Set3}
                margin={{ right: data.length > 6 ? 95 : 120, left: data.length > 6 ? 0 : 10 }}
                slotProps={{ legend: { hidden: data.length > 6 ? true : false } }}
                series={[
                  {
                    data: typeData,
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
                width={data.length > 6 ? 570 : 410}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-stat">
              <div className="stat-subtitle">Furniture Data Chart</div>
              <div className="boundary">
                <div className="line"></div>
                <div className="text">based on</div>
                <div className="line"></div>
              </div>
              <div className="stat-title">Main Material</div>
              <PieChart
                colors={Set3}
                margin={{ right: data.length > 6 ? 95 : 120, left: data.length > 6 ? 0 : 10 }}
                slotProps={{ legend: { hidden: data.length > 6 ? true : false } }}
                series={[
                  {
                    data: mainMaterialData,
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
                width={data.length > 6 ? 570 : 410}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Charts;
