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
  { id: 2, value: 20, label: "series C" },
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

const Charts = () => {
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
                margin={{ right: 100 }}
                series={[
                  {
                    data,
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
                width={400}
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
                margin={{ right: 100 }}
                series={[
                  {
                    data,
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
                width={400}
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
                margin={{ right: 100 }}
                series={[
                  {
                    data,
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
                width={400}
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
                margin={{ right: 100 }}
                series={[
                  {
                    data,
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
                width={400}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Charts;
