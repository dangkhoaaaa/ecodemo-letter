import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled, { keyframes, css } from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: orange; }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fall = keyframes`
  0% { transform: translateY(-100px); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const AudioPlayer = styled.audio`
  display: none;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  font-family: 'Cursive', sans-serif;
  background: linear-gradient(45deg, #E6E6FA, #800080, #FFA500, #FFD700);
  background-size: 400% 400%;
  animation: ${gradientBackground} 16s ease infinite;
  position: relative;
  overflow: hidden;
  padding-top: 50px;
`;

const Envelope = styled.img`
  width: 200px;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 500px;
  background: url(${({ image }) => image}) no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-image 0.5s ease;
`;

const Letter = styled.div`
  white-space: pre-line;
  overflow: hidden;
  border-right: .15em solid orange;
  font-size: 2em;
  max-width: 80%;
  animation: ${fadeIn} 1s ease forwards,
    ${typing} 4s steps(20, end),
    ${blinkCaret} .75s step-end infinite;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  ${({ visible }) => visible ? css`
    display: block;
  ` : css`
    display: none;
  `}
`;

const CarouselContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  ${({ visible }) => visible ? css`
    display: block;
  ` : css`
    display: none;
  `}
`;

const SliderImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

const Snowflake = styled.div`
  position: absolute;
  top: -10px;
  width: 10px;
  height: 10px;
  background: ${({ color }) => color};
  opacity: 0.8;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: ${fall} 10s linear infinite;
  left: ${({ left }) => left}%;
  animation-delay: ${({ delay }) => delay}s;
  animation-duration: ${({ duration }) => duration}s;
`;

const TimeMarkerContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
`;

const TimeMarker = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &::after {
    content: '${({ label }) => label}';
    position: absolute;
    top: 25px;
    left: -50%;
    transform: translateX(-50%);
    font-size: 0.8em;
    white-space: nowrap;
  }
`;

const App = () => {
  const [isLetterVisible, setLetterVisible] = useState(false);
  const [letterContent, setLetterContent] = useState("Gửi tới bé Hà Mi yêu vấu,\nEm ăn cơ......\nThời gian từ khi chúng ta gặp nhau lần đầu.\nMỗi Ngày mỗi phút anh điều nhớ về em.\n\n......");
  const [messageData, setMessageData] = useState({
    image: '',
    message: '',
  });
  const [bannerIndex, setBannerIndex] = useState(0);
  const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/utomp3.com%20-%20%C4%90%E1%BB%ABng%20L%C3%A0m%20Tr%C3%A1i%20Tim%20Anh%20%C4%90au%20%20S%C6%A1n%20T%C3%B9ng%20Mtp%20%20Piano%20Cover.mp3?alt=media&token=726b64d5-db5d-4a19-aa5d-5fec57064555';

  const banners = [
    'https://vi-magento.com/wp-content/uploads/2023/05/web-happy-lamb.jpg',
    'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5564893208395_e5a4adac0c1dd74b39155673fbb3212a.jpg?alt=media&token=5e550cce-35be-48ee-9660-103d0c1213ce',
    'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/b323a3f2-7673-4c95-be77-6cf93372472e.png?alt=media&token=948e1352-79ce-4cfb-9ebb-bc7be23b77ff',
    'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5564891884936_b4df4b5cf07d9a471840baa8e47fc804.jpg?alt=media&token=6bd5ac48-3b51-4dcb-821e-f6d2fd9804b5',
    'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/8bd230ef-67e4-43bd-8ec1-6603d6160860.png?alt=media&token=ff8e7e61-0001-4dfe-a38e-e626f6488517',
    'https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5564893170159_fd0189e54936bcfbf0580940418ace86.jpg?alt=media&token=2d9c5e03-0be5-4750-b05b-31400d8f7bf2',
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const createSnowflakes = (numFlakes) => {
    const colors = ['#FF0000', '#FF7F00', '#FFFF00'];
    return Array.from({ length: numFlakes }).map((_, index) => (
      <Snowflake
        key={index}
        left={Math.random() * 100}
        delay={Math.random() * 10}
        duration={Math.random() * 10 + 5}
        color={colors[Math.floor(Math.random() * colors.length)]}
      />
    ));
  };

  const handleEnvelopeClick = () => {
    setLetterVisible(true);
  };

  const handleTimeMarkerClick = (days) => {
    let newContent = "";
    switch (days) {
      case 10:
        newContent = "Em yêu thương ơi,\n\nKể từ khi chúng ta bắt đầu cuộc hành trình này cùng nhau. Mỗi phút giây bên cạnh em đều là những khoảnh khắc tuyệt vời. Anh muốn dành cho em những lời chân thành nhất, biết rằng mỗi ngày thêm một chút, tình cảm anh dành cho em lại lớn dần lên.\n\n";
        break;
      case 20:
        newContent = "Người con gái của anh,\n\nHôm nay là ngày thứ 20 chúng ta đã gặp nhau. Mỗi ngày, anh lại càng nhớ em nhiều hơn, và mỗi khoảnh khắc cùng em đều là một kỉ niệm đẹp.\n\nCảm ơn em vì đã đến bên anh, anh yêu em nhiều lắm.\n\nKhịt Khịt Khịt Khịt Khịt Khịt.\n";
        break;
      case 30:
        newContent = "Em yêu dấu của anh,\n\nTừ khi chúng ta bắt đầu chuyến hành trình này. Mỗi ngày, mỗi giờ, anh lại cảm thấy hạnh phúc khi có em bên cạnh.\n\nEm là tất cả những gì anh muốn và anh yêu em nhiều lắm.\n\nYours forever,\n";
        break;
      case 50:
        newContent = "Em thân yêu,\n\nChúng ta đã cùng nhau đi qua. Mỗi ngày, tình cảm anh dành cho em lại lớn dần lên và sâu đậm hơn. Anh không ngừng cảm thấy may mắn khi có em trong cuộc sống này.\n\nKhịt Khịt Khịt Khịt Khịt Khịt.\n";
        break;
      case 100:
        newContent = "Người con gái của anh,\n\nHôm nay là một ngày đặc biệt, ngày thứ 100 chúng ta đã đi qua bên nhau. Mỗi khoảnh khắc, mỗi kỉ niệm cùng em đều là những điều anh trân trọng nhất.\n\nAnh yêu em nhiều lắm, và anh không thể ngừng nghĩ về tương lai với em.\n\nVới tình yêu chân thành,\n";
        break;
      default:
        newContent = "Dear Love,\nEvery moment with you has been magical. Here's to many more days together.\n\nLove, [Your Name]";
    }
    setLetterContent(newContent);
  };
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <LetterContainer>
      {isLetterVisible ? (
        <>
          <AudioPlayer src={audioUrl} controls autoPlay />
          <Banner image={banners[bannerIndex]}>
            <Letter visible={isLetterVisible}>{letterContent}</Letter>
          </Banner>
          <TimeMarkerContainer>
            <TimeMarker label="10 days" onClick={() => handleTimeMarkerClick(10)} />
            <TimeMarker label="20 days" onClick={() => handleTimeMarkerClick(20)} />
            <TimeMarker label="30 days" onClick={() => handleTimeMarkerClick(30)} />
            <TimeMarker label="50 days" onClick={() => handleTimeMarkerClick(50)} />
            <TimeMarker label="100 days" onClick={() => handleTimeMarkerClick(100)} />
          </TimeMarkerContainer>
          {messageData.image && (
            <div>
              <p>{messageData.message}</p>
              <img src={messageData.image} alt="Time Marker Image" />
            </div>
          )}
          <CarouselContainer visible={isLetterVisible}>
            <Slider {...settings}>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/f5bd9bea-9ab4-44b2-91be-55a9ede1bf54.png?alt=media&token=d65750cd-e1ed-48b8-9a5d-b13ba3f18003" alt="Slide 1" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/8bd230ef-67e4-43bd-8ec1-6603d6160860.png?alt=media&token=ff8e7e61-0001-4dfe-a38e-e626f6488517" alt="Slide 2" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/194e5d3e-6078-4d1b-9726-72848aacc802.png?alt=media&token=88278a12-33a1-4e47-ada1-4932df4a7411" alt="Slide 3" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/b323a3f2-7673-4c95-be77-6cf93372472e.png?alt=media&token=948e1352-79ce-4cfb-9ebb-bc7be23b77ff" alt="Slide 4" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/8215beea-ee2a-4cea-8211-14318781a1bb.png?alt=media&token=55917856-0338-49de-98f2-b35eca770072" alt="Slide 5" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/729cbd80-21e8-4c2c-a652-9b03a81de70f.png?alt=media&token=48ff8856-3756-4291-b53f-7c4e15ccaf37" alt="Slide 6" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/3c9227bc-966f-483c-a7a8-2b28efb66c6e.png?alt=media&token=d88e8776-6a05-4628-8fd2-a356d208863a" alt="Slide 7" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/eb85800c-3081-4a83-9579-51d8a98e8d90.png?alt=media&token=8b141c1c-cd83-4822-968f-e13879834629" alt="Slide 8" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/c025fa9a-477f-4350-88b1-7fb2609bbb58.png?alt=media&token=b4c5ebbd-e2e2-42b5-a59f-e27920ec726c" alt="Slide 9" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5564893193663_37ad9798b1f1824c4c29117f64f20140.jpg?alt=media&token=ce26c14e-210a-4a8d-8b31-7aa06512c04e" alt="Slide 7" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5265117120518_6736ad50b41de9f9d9e662fea12794fb.jpg?alt=media&token=c1453a42-e99b-4c2a-850a-794ee2ad7a1f" alt="Slide 8" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5314887098633_d0da5fd61d88bda642b0702fef49d18c.jpg?alt=media&token=dbb24b19-a764-4571-8aaa-62ead67e2161" alt="Slide 9" />
              </div>
              <div>
                <SliderImage src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5564891979626_7ebeaf53b1f35be343cf99b214420d40.jpg?alt=media&token=9be03c10-3621-42af-b37b-ac40987a0b18" alt="Slide 9" />
              </div>
            </Slider>
          </CarouselContainer>
          {createSnowflakes(50)}
        </>
      ) : (
        <Envelope
          src="https://firebasestorage.googleapis.com/v0/b/love100-3d633.appspot.com/o/z5504545198790_82e4b75bf2374292f2f9bf6b834ca3e7.jpg?alt=media&token=f8f8b416-72f4-4695-9768-b1941b2e0748"
          alt="Envelope"
          onClick={handleEnvelopeClick}
        />
      )}
    </LetterContainer>
  );
};

export default App;
